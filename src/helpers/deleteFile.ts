import fs from 'fs';
import { join } from 'path';
import { awsVars, serverVars } from '../config';
import awsS3 from '../services/aws';

const deleteFile = async (fileName: string): Promise<void> => {
  if (!fileName) return;
  const fileKey = await awsS3.listObjects({
    Bucket: awsVars.AWS_SYRONAHEALTH_UPLOAD_BUCKET,
  });
  if (serverVars.NODE_ENV === 'production') {
    await awsS3.deleteObject({
      Bucket: awsVars.AWS_SYRONAHEALTH_UPLOAD_BUCKET,
      Key:
      fileKey?.Contents
      // eslint-disable-next-line no-unsafe-optional-chaining
      && fileKey?.Contents[fileKey.Contents?.length - 1].Key,
    });
    console.log(fileKey?.Contents
      // eslint-disable-next-line no-unsafe-optional-chaining
      && fileKey?.Contents[fileKey.Contents?.length - 1].Key);
  } else {
    await fs.promises.unlink(
      join(
        __dirname,
        '..',
        '..',
        serverVars.NODE_ENV === 'production'
          ? './uploads/'
          : './uploads-development/',
        fileName,
      ),
    );
  }
};

export default deleteFile;
