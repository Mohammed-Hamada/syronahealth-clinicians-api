import multer from 'multer';
import { diskStorage } from '../../config';
import { fileFilterCSV } from '../../helpers';

const uploadToDisk = multer({
  storage: diskStorage,
  fileFilter: fileFilterCSV,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default uploadToDisk;
