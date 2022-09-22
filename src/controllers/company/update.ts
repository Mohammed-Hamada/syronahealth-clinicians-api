import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'sequelize';
import { SuccessMessages } from '../../enums';
import {
  CustomError,
  differenceBetweenTwoArrays,
  splitEmails,
} from '../../helpers';
import { validateCompany, validateParameter } from '../../helpers/validation';
import { ResponseShape } from '../../interfaces';
import { getBusinessEmployeesForCompany, getCompanyById, updateExistingCompany } from '../../services';

const updateCompany = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    if (!request.body) {
      return next(new CustomError('No body found', StatusCodes.BAD_REQUEST));
    }
    const { id } = await validateParameter(
      request.params as { id: number | string },
    );
    const {
      allowedEmployees, coins, name, subscriptionType, email,
    } = request.body;

    const businessEmployees = await getBusinessEmployeesForCompany(+id);

    const arrayOfValidEmails = await splitEmails(email);

    const emailsToUpdate = await differenceBetweenTwoArrays(
      businessEmployees.map((e) => e.email) as [],
      arrayOfValidEmails as [],
    );

    const validCompany = await validateCompany({
      type: 'update',
      allowedEmployees,
      coins,
      name,
      subscriptionType,
    });

    await getCompanyById(+id);

    await updateExistingCompany(validCompany, +id);
    return response.json({ message: SuccessMessages.SUCCESS });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return next(new CustomError(error.message, StatusCodes.BAD_REQUEST));
      }
    }
    if (error instanceof ValidationError) {
      if (
        error.errors[0].type === ('Validation error' as 'validation error')
        && error.errors[0].path === 'uniqueCode'
      ) {
        return next(
          new CustomError(error.errors[0].message, StatusCodes.BAD_REQUEST),
        );
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(
          new CustomError(error.errors[0].message, StatusCodes.BAD_REQUEST),
        );
      }
    }
    return next(error);
  }
};

export default updateCompany;
