import { config } from 'dotenv';
import joi from 'joi';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV as string;

config({
  path: resolve(process.cwd(), `.env.${NODE_ENV}`),
});

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
const AWS_SYRONAHEALTH_UPLOAD_BUCKET = process.env
  .AWS_SYRONAHEALTH_UPLOAD_BUCKET as string;
const AWS_REGION = process.env
  .AWS_REGION as string;

const awsSchema = joi.object().keys({
  NODE_ENV: joi.string().valid('development', 'test', 'production').required(),
  AWS_ACCESS_KEY_ID: joi.string().required(),
  AWS_SECRET_ACCESS_KEY: joi.string().required(),
  AWS_SYRONAHEALTH_UPLOAD_BUCKET: joi.string().required(),
  AWS_REGION: joi.string().required(),
});

const awsVars = (): {
  NODE_ENV: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_SYRONAHEALTH_UPLOAD_BUCKET: string;
  AWS_REGION: string;
} => {
  const { value, error } = awsSchema.validate({
    NODE_ENV,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_SYRONAHEALTH_UPLOAD_BUCKET,
    AWS_REGION,
  });
  if (error) {
    throw new Error('Missing: AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY or AWS_SYRONAHEALTH_UPLOAD_BUCKET or AWS_REGION');
  }
  return value;
};

export default awsVars();
