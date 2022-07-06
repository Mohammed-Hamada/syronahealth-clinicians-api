import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../../enums';
import { AnotherErrors } from '../../interfaces';
const serverError = (
  { message, status }: AnotherErrors,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (status) {
    return res.status(status).json({ message });
  }
  return res.status(StatusCode.ServerErrorInternal).json({ message: 'An error occurs' });
};

export default serverError;
