import 'dotenv/config';
import http from 'http';
// import bodyParser from 'body-parser';
// import compression from 'compression';
import cors from 'cors';
import express from 'express';

// import { DataBase } from '@database/index';
// import { bootstrap } from '@helper/setupServerProtocol';
// import errorMiddleware from '@middleware/errorHandling';
// import logMiddleware from '@middleware/logMiddleware';
// import { notFoundHandler } from '@middleware/notFoundHandler';
// eslint-disable-next-line import/extensions
import router from './routes/routes.js';

// DataBase.getInstance();

const app = express();
app.use(
  cors({
    origin: '*',
    methods: '*',
  }),
);
// app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
// app.use(bodyParser.json({ limit: '150mb' }));
// app.use(compression());
// app.use(logMiddleware);
// app.use(router);
// app.disable('x-powered-by');
app.use('/api/v1', router);
// app.get('*', notFoundHandler);
// app.use(errorMiddleware);

http.createServer(app).listen(process.env.HTTPPORT, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP server is running in ${process.env.HTTPPORT}`);
});
