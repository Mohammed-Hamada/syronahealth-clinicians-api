import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../helpers';
import { getUserByEmail } from '../../services';

const checkEmailExistence = async (
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userEmail } = response.locals;
    const user = await getUserByEmail(userEmail);

    if (!user) {
      throw new CustomError(
        "Your email doesn't exists in our database",
        StatusCodes.BAD_REQUEST,
      );
    } else {
      response.locals.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default checkEmailExistence;
