import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorsMessages from '../../enums';
import { ClientErrors } from '../../interfaces';

const serverError = (
  { message, status }: ClientErrors,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  if (status) {
    return response.status(status).json({ message });
  }
  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ErrorsMessages.INTERNAL_SERVER_ERROR });
};

export default serverError;
