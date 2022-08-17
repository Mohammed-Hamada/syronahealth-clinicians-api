import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'sequelize';
import { SuccessMessages } from '../enums';
import CustomError from '../helpers';
import { validateCompany } from '../helpers/validation';
import { ResponseShape } from '../interfaces';
import { getAllCompanies, getCompanyById, addNewCompany } from '../services';

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

const createCompany = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const {
      allowedEmployees, coins, name, uniqueCode, subscriptionType,
    } = request.body;

    const company = await validateCompany({
      type: 'add',
      allowedEmployees,
      coins,
      name,
      uniqueCode,
      subscriptionType,
    });

    await addNewCompany(company);

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

export { sendAllCompanies, sendCompanyById, createCompany };
