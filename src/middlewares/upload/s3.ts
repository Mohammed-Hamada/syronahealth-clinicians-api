import multer from 'multer';
import { s3Storage } from '../../config';
import { fileFilterCSV } from '../../helpers';

const uploadToS3 = multer({
  storage: s3Storage,
  fileFilter: fileFilterCSV,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default uploadToS3;
