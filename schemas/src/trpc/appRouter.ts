import { ObjectId } from 'mongodb';
import { router, publicProcedure } from './trpc';
import { dbMiddleware } from './dbMiddleware';
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
  AddTagResponseType,
  addStoryToNarrative,
  getNarrativeStoriesResponseSchema,
  NarrativeStoryEntrySchemaType,
  addTagToNarrativeSchema,
  NarrativeMongoSchemaType,
  addTagToStorySchema,
  StoryMongoSchemaType,
  TagMongoSchemaType
} from '@info/schemas';
import { z } from 'zod';
import { establishConnectionToCollection } from './utils/db';
import { narrativeWithStoriesAggregation } from '../mongoQueries';
import { generateMongoQueryError } from './errorDefinitions';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { TRPCError } from '@trpc/server';


const appRouter: ReturnType<typeof router> = router({
  addStory: dbMiddleware
    .input(addStorySchema)
    .output(addStoryResponseSchema)
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection('stories');
      await collection.insertOne({
        ...input,
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
  addNarrative: dbMiddleware
    .input(addNarrativeSchema)
    .output(addNarrativeResponseSchema)
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection('narratives');
      await collection.insertOne({
        ...input,
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
  addTag: dbMiddleware
    .input(addTagSchema)
    .output(addTagResponseSchema)
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection('tags');
      try {
        const { insertedId, acknowledged } = await collection.insertOne({
          ...input,
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

  addTagsToNarrative: dbMiddleware
    .input(addTagToNarrativeSchema)
    .mutation(async ({ ctx, input }) => {
      const { narrativeId, tags } = input;
      const narrativeObjectId = new ObjectId(narrativeId);
      const collection = ctx.db.collection('narratives');
      const currentNarrative = await collection.findOne({ _id: narrativeObjectId });
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

  getTagList: dbMiddleware.input(getTagsQuerySchema).query(async ({ ctx, input }) => {
    const { searchString } = input;
    const collection = ctx.db.collection('tags');
    const validStringForSearch = !!searchString && searchString !== '';
    const filterObj = {
      ...(validStringForSearch
        ? { tagName: { $regex: new RegExp(`${searchString}`, 'i') } }
        : {}),
    };
    const results = await collection
      .find<AddTagResponseType>(filterObj)
      .toArray();
    return results;
  }),

  addStoryToNarrative: dbMiddleware
    .input(addStoryToNarrative)
    .mutation(async ({ ctx, input }) => {
      const { narrativeId, storyId } = input;
      const collection = ctx.db.collection('narrativeStoryMapping');
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

  getNarrativeStories: dbMiddleware
    .input(getNarrativeStoriesQuerySchema)
    .output(getNarrativeStoriesResponseSchema)
    .query(async ({ ctx, input }) => {
      const { narrativeId } = input;
      const collection = ctx.db.collection('narrativeStoryMapping');
      const results = await collection
        .aggregate<NarrativeStoryEntrySchemaType>(
          narrativeWithStoriesAggregation(new ObjectId(narrativeId))
        )
        .toArray();
      return results;
    }),

  addTagsToStory: dbMiddleware
    .input(addTagToStorySchema)
    .mutation(async ({ ctx, input }) => {
      const { storyId, tags } = input;
      const storyObjectId = new ObjectId(storyId);
      const collection = ctx.db.collection('stories');
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