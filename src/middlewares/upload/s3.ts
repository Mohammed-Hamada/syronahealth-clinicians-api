import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import { s3Storage } from '../../config';
import { CustomError, fileFilterCSV } from '../../helpers';

const uploadToS3 = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => multer({
  storage: s3Storage,
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

export default uploadToS3;
