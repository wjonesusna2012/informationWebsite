import express from 'express';
import axios from 'axios';
import generateHTMLNodes, { extractMetaTagsFromHTMLRoot } from './htmlParser';
import { createContext, router, publicProcedure } from './trpc';
import { addStorySchema, addStoryResponseSchema, addNarrativeSchema, addNarrativeResponseSchema } from '@info/schemas';
import * as trpcExpress from '@trpc/server/adapters/express';

const appRouter = router({
  addStory: publicProcedure
    .input(addStorySchema)
    .output(addStoryResponseSchema)
    .mutation(async opts => {
      console.log(opts);
      return {
        _id: 'Test ID',
        storyTitle: 'Title Test',
        summary: 'Lorem Ipsum I forget I don\'t have internet',
        createdAt: new Date(),
        createdBy: 'Yours Truly',
      };
    }),
  addNarrative: publicProcedure
    .input(addNarrativeSchema)
    .output(addNarrativeResponseSchema)
    .mutation(async opts => {
      console.log(opts);
      return {
        _id: 'Test ID',
        title: 'Title Test',
        summary: 'Lorem Ipsum I forget I don\'t have internet',
        abbreviation: 'EXO2020',
        createdAt: new Date(),
        createdBy: 'Yours Truly',
      };
    }),
})

export type AppRouter = typeof appRouter;

const expressRouter = express();
interface ProxyQuery {
  url: string;
}

expressRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

expressRouter.get('/', (req, res) => {
  res.send('Express Server Running');
});

expressRouter.get('/proxy/og/', (req, res) => {
  const params = req.query as unknown as ProxyQuery;
  axios.get(params.url).then((response) => {
    const htmlDoc = generateHTMLNodes(response.data);
    const responseObject = extractMetaTagsFromHTMLRoot(htmlDoc);
    res.json(responseObject);
  });
});

expressRouter.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

expressRouter.listen(3001, () => {
  console.log('Express server listening on port 3001');
});
