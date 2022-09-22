import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../helpers';

const checkAdmin = async (
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = response.locals;

    if (!user.isStaff) {
      throw new CustomError(
        "You don't have enough permissions",
        StatusCodes.UNAUTHORIZED,
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default checkAdmin;
