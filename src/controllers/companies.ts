import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'sequelize';
import { SuccessMessages } from '../enums';
import CustomError from '../helpers';
import { validateCompany, validateParameter } from '../helpers/validation';
import { ResponseShape } from '../interfaces';
import {
  getAllCompanies,
  getCompanyById,
  addNewCompany,
  updateExistingCompany,
} from '../services';

const sendAllCompanies = async (
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const companies = await getAllCompanies();
    return response.json({ message: SuccessMessages.SUCCESS, data: companies });
  } catch (error) {
    console.log(error);
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
      allowedEmployees, coins, name, uniqueCode, subscriptionType,
    } = request.body;

    const company = await validateCompany({
      type: 'update',
      allowedEmployees,
      coins,
      name,
      uniqueCode,
      subscriptionType,
    });

    const effectResult = await updateExistingCompany(company, +id);
    if (!effectResult) {
      return next(
        new CustomError(
          `There is no company with id ${id}`,
          StatusCodes.BAD_REQUEST,
        ),
      );
    }
    return response.json({ message: SuccessMessages.SUCCESS });
  } catch (error) {
    console.log(error);
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

export {
  sendAllCompanies, sendCompanyById, createCompany, updateCompany,
};
