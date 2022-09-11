import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { diskStorage } from '../../config';
import { fileFilterCSV, CustomError } from '../../helpers';

const uploadToDisk = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => multer({
  storage: diskStorage,
  fileFilter: fileFilterCSV,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
}).single('users')(request, response, (err) => {
  if (err && err.field !== 'users') {
    return next(
      new CustomError("Filed name must be 'users'", StatusCodes.BAD_REQUEST),
    );
  }
  if (!request.file) {
    return next(
      new CustomError('Please add a CSV file', StatusCodes.BAD_REQUEST),
    );
  }
  return next();
});

export default uploadToDisk;
