import express from 'express';
import axios from 'axios';
import generateHTMLNodes, { extractMetaTagsFromHTMLRoot } from './htmlParser';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter, createContext } from '@info/schemas';

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

