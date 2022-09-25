import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../helpers';
import { getUserByEmail } from '../../services';

const checkEmailExistence = async (
  request: Request | any,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = request.auth;
    const user = await getUserByEmail(email);

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
