import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'sequelize';
import { SuccessMessages } from '../enums';
import { CustomError, generateUniqueCode } from '../helpers';
import {
  validateCompany,
  validateEmails,
  validateParameter,
} from '../helpers/validation';
import { ResponseShape, UserShape } from '../interfaces';
import {
  getAllCompanies,
  getCompanyById,
  addNewCompany,
  updateExistingCompany,
  addNewUsers,
  getCompanyByUniqueCode,
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
  let validArrayOfUsers: Array<UserShape> = [];
  try {
    if (!request.body) {
      return next(new CustomError('No body found', StatusCodes.BAD_REQUEST));
    }
    const {
      allowedEmployees, coins, name, subscriptionType, email,
    } = request.body;

    let uniqueCode = await generateUniqueCode(6);
    let companyByUniqueCode = await getCompanyByUniqueCode(uniqueCode);
    while (companyByUniqueCode) {
      // eslint-disable-next-line no-await-in-loop
      uniqueCode = await generateUniqueCode(6);
      // eslint-disable-next-line no-await-in-loop
      companyByUniqueCode = await getCompanyByUniqueCode(uniqueCode);
    }

    const validCompany = await validateCompany({
      type: 'add',
      allowedEmployees,
      coins,
      name,
      uniqueCode,
      subscriptionType,
    });
    await addNewCompany(validCompany);

    if (email === undefined) {
      throw new CustomError('No email found', StatusCodes.BAD_REQUEST);
    }
    const emailAddressesSeparatedByComma: string = email
      .replace(/[, ]+/g, ',')
      .trim();

    const { emails: validEmails } = await validateEmails({
      emails: emailAddressesSeparatedByComma,
    });
    validArrayOfUsers = validEmails.split(',').map((ele) => ({
      email: ele,
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      isStaff: false,
      isDeleted: false,
      isActive: false,
      isBusiness: true,
    }));
    await addNewUsers(validArrayOfUsers);

    return response.json({ message: SuccessMessages.SUCCESS });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return next(new CustomError(error.message, StatusCodes.BAD_REQUEST));
    }
    if (error instanceof ValidationError) {
      if (
        error.errors[0].type === 'unique violation'
        && error.errors[0].path === 'email'
      ) {
        return next(
          validArrayOfUsers.length === 1
            ? new CustomError(
              'This email address is already being used',
              StatusCodes.BAD_REQUEST,
            )
            : new CustomError(
              'One or more of the email addresses are already being used',
              StatusCodes.BAD_REQUEST,
            ),
        );
      }
      return next(
        new CustomError(error.errors[0].message, StatusCodes.BAD_REQUEST),
      );
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

    const updateResult = await updateExistingCompany(company, +id);
    if (!updateResult) {
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
