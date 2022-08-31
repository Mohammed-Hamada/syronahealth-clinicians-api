import { Request } from 'express';
import multer from 'multer';
import { fileNameCSV } from '../../helpers';
import { serverVars } from '../env';

const diskStorage = multer.diskStorage({
  destination: (_request: Request, _file: Express.Multer.File, callBack) => {
    callBack(
      null,
      serverVars.NODE_ENV === 'production'
        ? './uploads/'
        : './uploads-development',
    );
  },
  filename: fileNameCSV,
});

export default diskStorage;
