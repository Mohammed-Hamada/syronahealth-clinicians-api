import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {
  notFoundHandler,
  errorsHandler,
  jwtCheck,
  checkEmailExistence,
  // auth0ManagementAPI,
  checkAdmin,
} from './middlewares';
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
  // auth0ManagementAPI,
  checkEmailExistence,
]);

app.use('/api/v1', checkAdmin, router);

app.use([notFoundHandler, errorsHandler]);

export default app;
