import { NextFunction, Request, Response } from 'express';
import { SuccessMessages } from '../../enums';
import { ResponseShape } from '../../interfaces';
import { getAllCompanies } from '../../services';

const sendAllCompanies = async (
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const companies = await getAllCompanies();
    return response.json({ message: SuccessMessages.SUCCESS, data: companies });
  } catch (error) {
    return next(error);
  }
};

export default sendAllCompanies;
