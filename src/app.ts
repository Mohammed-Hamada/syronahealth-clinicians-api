import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { notFoundError, serverError } from './middlewares';
import router from './routes';

const app: Express = express();

app.set('port', process.env.PORT || 4000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(
  morgan('tiny', {
    skip: () => process.env.NODE_ENV === 'production' || false,
  })
);

app.use('/api/v1', router);

app.use(notFoundError);
app.use(serverError);

export default app;
