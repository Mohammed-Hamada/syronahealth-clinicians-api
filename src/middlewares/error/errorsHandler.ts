import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorsMessages } from '../../enums';
import { ClientErrors } from '../../interfaces';

const errorsHandler = (
  { message, status, name }: ClientErrors,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  if (status) {
    return response.status(status).json({ message });
  }
  if (!status && name === 'Error' && message.includes('File does not exist.')) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: 'The file should be a csv file.',
    });
  }
  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ErrorsMessages.INTERNAL_SERVER_ERROR });
};

export default errorsHandler;
