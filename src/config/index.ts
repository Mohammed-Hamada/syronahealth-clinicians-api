import { config } from 'dotenv';

config();

const NODE_ENV = process.env.NODE_ENV as string;
const DB_NAME = process.env.DB_NAME as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_USER = process.env.DB_USER as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_PSWD = process.env.DB_PSWD as string;
const SECRET_KEY = process.env.SECRET_KEY as string;
const { PORT } = process.env;

export {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PSWD,
  DB_USER,
  SECRET_KEY,
  PORT,
};
