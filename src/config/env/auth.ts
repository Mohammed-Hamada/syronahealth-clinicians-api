import { config } from 'dotenv';
import joi from 'joi';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV as string;

config({
  path: resolve(process.cwd(), `.env.${NODE_ENV}`),
});

const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL as string;
const CLIENT_ID = process.env.CLIENT_ID as string;
const BASE_URL = process.env.BASE_URL as string;
const SECRET_KEY = process.env.SECRET_KEY as string;

const authSchema = joi.object().keys({
  NODE_ENV: joi.string().valid('development', 'test', 'production').required(),
  SECRET_KEY: joi.string().required(),
  ISSUER_BASE_URL: joi.string().required(),
  CLIENT_ID: joi.string().required(),
  BASE_URL: joi.string().required(),
});

const authVars = (): {
  NODE_ENV: string;
  ISSUER_BASE_URL: string;
  CLIENT_ID: string;
  BASE_URL: string;
  SECRET_KEY: string;
} => {
  const { value, error } = authSchema.validate({
    NODE_ENV,
    ISSUER_BASE_URL,
    CLIENT_ID,
    BASE_URL,
    SECRET_KEY,
  });
  if (error) {
    throw new Error(
      'Missing: ISSUER_BASE_URL or CLIENT_ID or BASE_URL or SECRET_KEY',
    );
  }
  return value;
};

export default authVars();
