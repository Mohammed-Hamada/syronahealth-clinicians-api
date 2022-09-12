import { config } from 'dotenv';
import joi from 'joi';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV as string;

config({
  path: resolve(process.cwd(), `.env.${NODE_ENV}`),
});

const SECRET_KEY = process.env.SECRET_KEY as string;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE as string;
const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
const GRANT_TYPE = process.env.GRANT_TYPE as string;

const authSchema = joi.object().keys({
  NODE_ENV: joi.string().valid('development', 'test', 'production').required(),
  SECRET_KEY: joi.string().required(),
  AUTH0_DOMAIN: joi.string().required(),
  AUTH0_AUDIENCE: joi.string().required(),
  CLIENT_ID: joi.string().required(),
  CLIENT_SECRET: joi.string().required(),
  GRANT_TYPE: joi.string().required(),
});

const authVars = (): {
  NODE_ENV: string;
  SECRET_KEY: string;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  GRANT_TYPE: string;
} => {
  const { value, error } = authSchema.validate({
    NODE_ENV,
    SECRET_KEY,
    AUTH0_DOMAIN,
    AUTH0_AUDIENCE,
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
  });
  if (error) {
    throw new Error(
      'Missing: AUTH0_DOMAIN or AUTH0_AUDIENCE or CLIENT_ID or CLIENT_SECRET or GRANT_TYPE',
    );
  }
  return value;
};

export default authVars();
