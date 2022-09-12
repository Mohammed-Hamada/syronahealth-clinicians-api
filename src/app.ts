import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { notFoundHandler, errorsHandler, jwtCheck } from './middlewares';
import router from './routes';

const app: Express = express();

app.use([
  express.urlencoded({ extended: false }),
  express.json(),
  cookieParser(),
  cors(),
  compression(),
  morgan('tiny', {
    skip: () => process.env.NODE_ENV === 'production',
  }),
  jwtCheck,
]);

app.use('/api/v1', router);

app.use([notFoundHandler, errorsHandler]);

export default app;
