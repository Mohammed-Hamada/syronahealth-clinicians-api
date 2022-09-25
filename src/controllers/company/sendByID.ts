import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SuccessMessages } from '../../enums';
import { CustomError } from '../../helpers';
import { validateParameter } from '../../helpers/validation';
import { ResponseShape } from '../../interfaces';
import {
  getCompanyById,
} from '../../services';

const sendCompanyById = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const { id } = await validateParameter(
      request.params as { id: number | string },
    );
    const company = await getCompanyById(+id);
    return response.json({ message: SuccessMessages.SUCCESS, data: company });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return next(new CustomError(error.message, StatusCodes.BAD_REQUEST));
      }
    }
    return next(error);
  }
};

export default sendCompanyById;
