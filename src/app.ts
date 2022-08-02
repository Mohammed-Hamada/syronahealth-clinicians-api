import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { notFoundHandler, errorsHandler } from './middlewares';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(
  morgan('tiny', {
    skip: () => process.env.NODE_ENV === 'production',
  }),
);

app.use(notFoundHandler);
app.use(errorsHandler);

export default app;
