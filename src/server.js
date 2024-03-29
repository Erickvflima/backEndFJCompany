import 'dotenv/config';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import DataBase from './dataBase/index.js';
import router from './routes/routes.js';
import notFoundHandler from './middleware/notFoundHandler.js';

DataBase.getInstance();

const app = express();
app.use(
  cors({
    origin: '*',
    methods: '*',
  }),
);
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(router);
app.disable('x-powered-by');
app.use('/api/v1', router);
app.get('*', notFoundHandler);

http.createServer(app).listen(process.env.HTTPPORT, () => {
  console.log(`HTTP server is running in ${process.env.HTTPPORT}`);
});
