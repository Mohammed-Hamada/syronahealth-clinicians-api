import { Request } from 'express';
import path from 'path';

const fileNameCSV = (request: Request, file: Express.Multer.File, cb: CallableFunction): void => {
  cb(
    null,
    `company-${request.params.id}-${
      file.fieldname
    }-${Date.now()}${path.extname(file.originalname)}`,
  );
};

export default fileNameCSV;
