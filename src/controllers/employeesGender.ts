import { NextFunction, Request, Response } from 'express';
import { SuccessMessages } from '../enums';
import { ResponseShape } from '../interfaces';
import { getEmployeesGenderForCompany } from '../services';

const sendEmployeesGenderForCompany = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const { id } = request.params;
    const employeesGender = await getEmployeesGenderForCompany(+id);
    return response.json({
      message: SuccessMessages.SUCCESS,
      data: employeesGender,
    });
  } catch (error) {
    return next(error);
  }
};

export default sendEmployeesGenderForCompany;
