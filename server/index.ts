import express from 'express';
import { ObjectId } from 'mongodb';
import axios from 'axios';
import generateHTMLNodes, { extractMetaTagsFromHTMLRoot } from './htmlParser';
import { createContext, router, publicProcedure } from './trpc';
import {
  addStorySchema,
  addStoryResponseSchema,
  addNarrativeSchema,
  addNarrativeResponseSchema,
  getNarrativeStoriesQuerySchema,
  addTagResponseSchema,
  addTagSchema,
  AddNarrativeResponseType,
  getTagsQuerySchema,
  addTagToNarrativeResponseSchema,
  AddTagResponseType,
  addStoryToNarrative,
  getNarrativeStoriesResponseSchema,
  NarrativeStoryEntrySchemaType,
  addTagToNarrativeSchema,
  AddTagToNarrativeResponseType,
  NarrativeMongoSchemaType,
  addTagToStorySchema,
  addTagToStoryResponseSchema,
  AddTagToStoryResponseType,
  StoryMongoSchemaType
} from '@info/schemas';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import client from './database';
import { establishConnectionToCollection } from './utils/db';
import { pick } from 'lodash';
import { narrativeWithStoriesAggregation } from './mongoQueries';
import { generateMongoQueryError } from './errorDefinitions';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

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
      const { insertedId } = await collection.insertOne({
        ...opts.input,
        createdAt: new Date(),
        createdBy: 'Phil N. Later'
      });
      const insertedObject = await collection.findOne(insertedId);
      return {
        _id: insertedId.toString(), // Ensure _id is explicitly a string
        tagTitle: 'Title Test',
        tagName: "Lorem Ipsum I forget I don't have internet",
        createdAt: new Date(),
        createdBy: 'Yours Truly'
      };
    }),

  addTagsToNarrative: publicProcedure
    .input(addTagToNarrativeSchema)
    .output(addTagToNarrativeResponseSchema)
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

  getTagList: publicProcedure.input(getTagsQuerySchema).query(async (opts) => {
    const { searchString, userId } = opts.input;
    const db = client.db('NarrativesProject');
    const collection = db.collection('tags');
    const validUserForSearch = !!userId && userId !== '';
    const validStringForSearch = !!searchString && searchString !== '';
    const filterObj = {
      ...(validStringForSearch
        ? { tagName: { $regex: new RegExp(`${searchString}`, 'i') } }
        : {}),
      ...(validUserForSearch
        ? { tagName: { $regex: new RegExp(`${userId}`, 'i') } }
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
      return results;
    }),

  addTagsToStory: publicProcedure
    .input(addTagToStorySchema)
    .output(addTagToStoryResponseSchema)
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
