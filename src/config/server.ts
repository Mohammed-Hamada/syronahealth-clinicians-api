import { config } from 'dotenv';
import joi from 'joi';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV as string;

config({
  path: resolve(process.cwd(), `.env.${NODE_ENV}`),
});

const PORT = process.env.PORT as string;

const serverSchema = joi.object().keys({
  NODE_ENV: joi.string().valid('development', 'test', 'production').required(),

  PORT: joi
    .string()
    .when('NODE_ENV', {
      is: 'development',
      then: joi.string().required(),
    })
    .concat(
      joi
        .string()
        .when('NODE_ENV', { is: 'test', then: joi.string().required() }),
    ),
});

const serverVars = (): {
  NODE_ENV?: string;
  PORT?: string;
} => {
  const { value, error } = serverSchema.validate({
    NODE_ENV,
    PORT,
  });
  if (error) {
    throw new Error('Missing: PORT');
  }
  return value;
};
export default serverVars();
