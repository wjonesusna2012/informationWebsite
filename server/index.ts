import express from 'express';

const expressRouter = express();

expressRouter.get('/', (req, res) => {
  res.send('Express Server Running');
});