import { Request } from 'express';

const fileFilterCSV = (
  _request: Request,
  file: Express.Multer.File,
  cb: CallableFunction,
): void => {
  // eslint-disable-next-line no-unused-expressions
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default fileFilterCSV;
