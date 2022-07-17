import { config } from 'dotenv';
import joi from 'joi';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV as string;

config({
  path: resolve(process.cwd(), `.env.${NODE_ENV}`),
});

const DATABASE_URL = process.env.DATABASE_URL as string;

const databaseSchema = joi.object().keys({
  NODE_ENV: joi.string().valid('development', 'test', 'production').required(),
  DATABASE_URL: joi.when('NODE_ENV', {
    is: 'development',
    then: joi.when('NODE_ENV', {
      is: 'test',
      then: joi.string().required(),
    }),
  }),
});

const databaseVars = (): {
  NODE_ENV: string;
  DATABASE_URL: string;
} => {
  const { value, error } = databaseSchema.validate({
    NODE_ENV,
    DATABASE_URL,
  });
  if (error) {
    throw new Error('Missing: DATABASE_URL');
  }
  return value;
};
export default databaseVars();
