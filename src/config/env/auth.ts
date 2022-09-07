import { config } from 'dotenv';
import joi from 'joi';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV as string;

config({
  path: resolve(process.cwd(), `.env.${NODE_ENV}`),
});

const JWKS_URI = process.env.JWKS_URI as string;
const ISSUER = process.env.ISSUER as string;
const SECRET_KEY = process.env.SECRET_KEY as string;

const authSchema = joi.object().keys({
  NODE_ENV: joi.string().valid('development', 'test', 'production').required(),
  SECRET_KEY: joi.string().required(),
  JWKS_URI: joi.string().required(),
  ISSUER: joi.string().required(),
});

const authVars = (): {
  NODE_ENV: string;
  SECRET_KEY: string;
  JWKS_URI: string;
  ISSUER: string;
} => {
  const { value, error } = authSchema.validate({
    NODE_ENV,
    JWKS_URI,
    SECRET_KEY,
    ISSUER,
  });
  if (error) {
    throw new Error(
      'Missing: JWKS_URI or SECRET_KEY or ISSUER',
    );
  }
  return value;
};

export default authVars();
