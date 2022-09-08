import { S3 } from '@aws-sdk/client-s3';
import { awsVars } from '../../config';

const awsS3 = new S3({
  credentials: {
    accessKeyId: awsVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: awsVars.AWS_SECRET_ACCESS_KEY,
  },
  region: awsVars.AWS_REGION,
});

export default awsS3;
