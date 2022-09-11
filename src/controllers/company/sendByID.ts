import { NextFunction, Request, Response } from 'express';
import { SuccessMessages } from '../../enums';
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
    const { id } = request.params;
    const company = await getCompanyById(+id);
    return response.json({ message: SuccessMessages.SUCCESS, data: company });
  } catch (error) {
    return next(error);
  }
};

export default sendCompanyById;
