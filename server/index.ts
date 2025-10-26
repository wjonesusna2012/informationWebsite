import {
  addNarrativeResponseSchema,
  AddNarrativeResponseType,
  addNarrativeSchema,
  addStoryResponseSchema,
  addStorySchema,
  addStoryToNarrative,
  addTagResponseSchema,
  AddTagResponseType,
  addTagSchema,
  addTagToNarrativeSchema,
  addTagToStorySchema,
  getNarrativeStoriesQuerySchema,
  getNarrativeStoriesResponseSchema,
  getStoryResponseSchema,
  getStorySchema,
  getTagsQuerySchema,
  NarrativeMongoSchemaType,
  NarrativeStoryEntrySchemaType,
  StoryMongoSchemaType,
  TagMongoSchemaType
} from '@info/schemas';
import { inferRouterInputs, inferRouterOutputs, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import client from './database';
import { generateMongoQueryError } from './errorDefinitions';
import generateHTMLNodes, { extractMetaTagsFromHTMLRoot } from './htmlParser';
import { narrativeWithStoriesAggregation } from './mongoQueries';
import { createContext, publicProcedure, router } from './trpc';
import { establishConnectionToCollection } from './utils/db';

const appRouter = router({
  addStory: publicProcedure
    .input(addStorySchema)
    .output(addStoryResponseSchema)
    .mutation(async (opts) => {
      await client.connect();
      const db = client.db('NarrativesProject');
      const collection = db.collection('stories');
      await collection.insertOne({
        ...opts.input,
        createdAt: new Date(),
        createdBy: 'Phil N. Later'
      });
      return {
        _id: 'Test ID' as string, // Explicitly define _id as a string
        storyTitle: 'Title Test',
        summary: "Lorem Ipsum I forget I don't have internet",
        link: '',
        date: new Date(),
        createdAt: new Date(),
        createdBy: 'Yours Truly',
        tags: [] // Add default value for optional tags if needed
      };
    }),
  addNarrative: publicProcedure
    .input(addNarrativeSchema)
    .output(addNarrativeResponseSchema)
    .mutation(async (opts) => {
      await client.connect();
      const db = client.db('NarrativesProject');
      const collection = db.collection('narratives');
      await collection.insertOne({
        ...opts.input,
        createdAt: new Date(),
        createdBy: 'Phil N. Later'
      });
      return {
        _id: 'Test ID', // Explicitly define _id as a string
        title: 'Title Test',
        summary: "Lorem Ipsum I forget I don't have internet",
        abbreviation: 'EXO2020',
        createdAt: new Date(),
        createdBy: 'Yours Truly',
        tags: [] // Add default value for optional tags if needed
      };
    }),
  addTag: publicProcedure
    .input(addTagSchema)
    .output(addTagResponseSchema)
    .mutation(async (opts) => {
      await client.connect();
      const db = client.db('NarrativesProject');
      const collection = db.collection('tags');
      try {
        const { insertedId, acknowledged } = await collection.insertOne({
          ...opts.input,
          createdAt: new Date(),
          createdBy: 'Phil N. Later'
        });
        if (!acknowledged) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Write to MongoDb instance not acknowledged for tag: ${insertedId}`
          });
        }
        const insertedObject = await collection.findOne<TagMongoSchemaType>(
          insertedId
        );

        if (!insertedObject) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Failed to retrieve newly created tag with id: ${insertedId}`
          });
        }

        return insertedObject;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred while adding the tag.',
          cause: error
        });
      }
    }),

  addTagsToNarrative: publicProcedure
    .input(addTagToNarrativeSchema)
    .mutation(async (opts) => {
      await client.connect();
      const { narrativeId, tags } = opts.input;
      const narrativeObjectId = new ObjectId(narrativeId);
      const db = client.db('NarrativesProject');
      const collection = db.collection('narratives');
      const currentNarrative = await db
        .collection('narratives')
        .findOne({ _id: narrativeObjectId });
      if (!currentNarrative) {
        throw generateMongoQueryError(
          `Failed to find narrative with objectId ${narrativeId}.`
        );
      }
      const { matchedCount, modifiedCount } = await collection.updateOne(
        {
          _id: narrativeObjectId
        },
        {
          $set: {
            tags,
            updatedAt: new Date(),
            updatedBy: 'Phil N. Later'
          }
        }
      );
      if (matchedCount === 1 && modifiedCount === 1) {
        const updatedNarrative =
          await collection.findOne<NarrativeMongoSchemaType>({
            _id: narrativeObjectId
          });
        if (!!updatedNarrative) {
          return updatedNarrative;
        }
      } else {
        throw generateMongoQueryError(
          `Failed to update narrative with objectId ${narrativeId}.`
        );
      }
      throw generateMongoQueryError('Unknown error occurred');
    }),

  getStory: publicProcedure
    .input(getStorySchema)
    .output(getStoryResponseSchema)
    .query(async (opts) => {
      const { storyId } = opts.input;
      const db = client.db('NarrativesProject');
      const collection = db.collection('stories');
      const res = await collection.findOne<StoryMongoSchemaType>({
        _id: new ObjectId(storyId)
      });

      if (!res) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Story with id ${storyId} not found.`
        });
      }

      return res;
    }),

  getTagList: publicProcedure.input(getTagsQuerySchema).query(async (opts) => {
    const { searchString } = opts.input;
    const db = client.db('NarrativesProject');
    const collection = db.collection('tags');
    const validStringForSearch = !!searchString && searchString !== '';
    const filterObj = {
      ...(validStringForSearch
        ? { tagName: { $regex: new RegExp(`${searchString}`, 'i') } }
        : {})
    };
    const results = await collection
      .find<AddTagResponseType>(filterObj)
      .toArray();
    return results;
  }),

  addStoryToNarrative: publicProcedure
    .input(addStoryToNarrative)
    .mutation(async (opts) => {
      const { narrativeId, storyId } = opts.input;
      await client.connect();
      const db = client.db('NarrativesProject');
      const collection = db.collection('narrativeStoryMapping');
      await collection.insertOne({
        narrativeId,
        storyId,
        createdAt: new Date(),
        createdBy: 'Phil N. Later'
      });
    }),

  getNarrativesList: publicProcedure
    .output(z.array(addNarrativeResponseSchema))
    .query(async (opts) => {
      const collection = await establishConnectionToCollection(
        'NarrativesProject',
        'narratives'
      );
      const results = await collection
        .find<AddNarrativeResponseType>({})
        .toArray();
      return results;
    }),

  getNarrativeStories: publicProcedure
    .input(getNarrativeStoriesQuerySchema)
    .output(getNarrativeStoriesResponseSchema)
    .query(async (opts) => {
      const { narrativeId } = opts.input;
      await client.connect();
      const db = client.db('NarrativesProject');
      const collection = db.collection('narrativeStoryMapping');
      const results = await collection
        .aggregate<NarrativeStoryEntrySchemaType>(
          narrativeWithStoriesAggregation(new ObjectId(narrativeId))
        )
        .toArray();
      if (results.length != 1) {
        throw generateMongoQueryError(
          `Failed to find narrative with objectId ${narrativeId}.`
        );
      }
      return results[0];
    }),

  addTagsToStory: publicProcedure
    .input(addTagToStorySchema)
    .mutation(async (opts) => {
      await client.connect();
      const { storyId, tags } = opts.input;
      const storyObjectId = new ObjectId(storyId);
      const db = client.db('NarrativesProject');
      const collection = db.collection('stories');
      const currentStory = await collection.findOne({ _id: storyObjectId });

      if (!currentStory) {
        throw generateMongoQueryError(
          `Failed to find story with objectId ${storyId}.`
        );
      }

      const { matchedCount, modifiedCount } = await collection.updateOne(
        {
          _id: storyObjectId
        },
        {
          $set: {
            tags,
            updatedAt: new Date(),
            updatedBy: 'Phil N. Later'
          }
        }
      );

      if (matchedCount === 1 && modifiedCount === 1) {
        const updatedStory = await collection.findOne<StoryMongoSchemaType>({
          _id: storyObjectId
        });

        if (!!updatedStory) {
          return updatedStory;
        }
      } else {
        throw generateMongoQueryError(
          `Failed to update story with objectId ${storyId}.`
        );
      }

      throw generateMongoQueryError('Unknown error occurred');
    })
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

const expressRouter = express();

expressRouter.use(cors());
expressRouter.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

expressRouter.get('/', (req, res) => {
  res.sendStatus(200);
});

interface ProxyQuery {
  url: string;
}
expressRouter.get('/proxy/og/', (req, res) => {
  const params = req.query as unknown as ProxyQuery;
  axios.get(params.url).then((response) => {
    const htmlDoc = generateHTMLNodes(response.data);
    const responseObject = extractMetaTagsFromHTMLRoot(htmlDoc);
    res.json(responseObject);
  });
});

expressRouter.listen(4000, () => {
  console.log('Express server listening on port 4000!!');
});
