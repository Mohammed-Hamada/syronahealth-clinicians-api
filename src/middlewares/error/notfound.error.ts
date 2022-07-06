import { Request, Response } from 'express';
import { StatusCode } from '../../enums';
import { NotFoundError } from '../../interfaces';

const notFoundError = (_: Request, res: Response) => {
  const { status, message }: NotFoundError = {
    message: 'Sorry, this page not found',
    status: StatusCode.ClientErrorNotFound,
  };
  res.status(status).json({ message });
};

export default notFoundError;
