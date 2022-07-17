import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorsMessages from '../../enums';
import { NotFoundError } from '../../interfaces';

const notFoundHandler = (_request: Request, response: Response):void => {
  const { status, message }: NotFoundError = {
    message: ErrorsMessages.NOT_FOUND,
    status: StatusCodes.NOT_FOUND,
  };
  response.status(status).json({ message });
};

export default notFoundHandler;
