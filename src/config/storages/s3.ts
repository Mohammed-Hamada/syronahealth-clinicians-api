import multerS3 from 'multer-s3';
import { awsVars } from '..';
import { fileNameCSV } from '../../helpers';
import awsClient from '../../services/aws';

const s3Storage = multerS3({
  s3: awsClient,
  bucket: awsVars.AWS_SYRONAHEALTH_UPLOAD_BUCKET,
  metadata(_req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: fileNameCSV,
});

export default s3Storage;
