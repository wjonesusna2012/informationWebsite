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
  getTagsResponseSchema,
  GetTagsResponseType,
  AddTagResponseType,
  addStoryToNarrative,
  getNarrativeStoriesResponseSchema,
  NarrativeStoryEntrySchemaType
} from '@info/schemas';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import client from './database';
import { establishConnectionToCollection } from './utils/db';
import { pick } from 'lodash';
import { narrativeWithStoriesAggregation } from './mongoQueries';

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
        _id: 'Test ID',
        storyTitle: 'Title Test',
        summary: "Lorem Ipsum I forget I don't have internet",
        link: '',
        date: new Date(),
        createdAt: new Date(),
        createdBy: 'Yours Truly'
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
        _id: 'Test ID',
        title: 'Title Test',
        summary: "Lorem Ipsum I forget I don't have internet",
        abbreviation: 'EXO2020',
        createdAt: new Date(),
        createdBy: 'Yours Truly'
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
        _id: 'Test ID',
        tagTitle: 'Title Test',
        tagName: "Lorem Ipsum I forget I don't have internet",
        createdAt: new Date(),
        createdBy: 'Yours Truly'
      };
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
    // .output()
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
    })
});

export type AppRouter = typeof appRouter;

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
