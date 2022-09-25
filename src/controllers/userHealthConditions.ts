import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SuccessMessages } from '../enums';
import { CustomError } from '../helpers';
import { validateParameter } from '../helpers/validation';
import { ResponseShape } from '../interfaces';
import { getUsersHealthConditionsForCompany } from '../services';

const sendUsersHealthConditionsForCompany = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const { id } = await validateParameter(
      request.params as { id: number | string },
    );
    const usersInterests = await getUsersHealthConditionsForCompany(+id);
    return response.json({
      message: SuccessMessages.SUCCESS,
      data: usersInterests,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return next(new CustomError(error.message, StatusCodes.BAD_REQUEST));
      }
    }
    return next(error);
  }
};

export default sendUsersHealthConditionsForCompany;
