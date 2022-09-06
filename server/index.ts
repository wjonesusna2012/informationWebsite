import express from 'express';
import axios from 'axios';
import generateHTMLNodes, { extractMetaTagsFromHTMLRoot } from './htmlParser';

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

expressRouter.listen(3001, () => {
  console.log('Express server listening on port 3001');
});
