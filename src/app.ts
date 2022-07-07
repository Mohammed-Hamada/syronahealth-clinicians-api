import dotenv from 'dotenv';
import express, { Express, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { notFoundError, serverError } from './middlewares';

dotenv.config({ path: '.env' });

const app: Express = express();
const router = Router();

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

app.use('/api/v1', router);

app.use(notFoundError);
app.use(serverError);

export default app;
