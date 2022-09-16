import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'sequelize';
import { SuccessMessages } from '../../enums';
import {
  CustomError,
  differenceBetweenTwoArrays,
  generateUniqueCode,
  splitEmails,
} from '../../helpers';
import { validateCompany, validateParameter } from '../../helpers/validation';
import { ResponseShape, UserShape } from '../../interfaces';
import {
  getAllCompanies,
  getCompanyById,
  addNewCompany,
  updateExistingCompany,
  addNewUsers,
  getCompanyByUniqueCode,
  addNewEmployee,
  getUserFromMultipleEmails,
} from '../../services';
import getBusinessEmployeesForCompany from '../../services/getBusinessEmployeesForCompany';

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

    const arrayOfValidEmails = await splitEmails(email);

    const existingUsers = await getUserFromMultipleEmails(arrayOfValidEmails);

    if (existingUsers.length !== 0) {
      throw new CustomError(
        existingUsers.length === 1
          ? `This email address already exists: (${existingUsers[0].email})`
          : `These emails addresses already exists:  ${existingUsers
            .map((user) => `(${user.email})`)
            .join(' ')}`,
        StatusCodes.BAD_REQUEST,
      );
    }

    validArrayOfUsers = arrayOfValidEmails.map((ele) => ({
      email: ele,
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      isStaff: false,
      isDeleted: false,
      isActive: false,
      isBusiness: true,
    }));

    const users: Array<UserShape> = await addNewUsers(validArrayOfUsers);
    const company = await addNewCompany(validCompany);
    users.forEach(async (user): Promise<void> => {
      await addNewEmployee(user.id as number, company.id as number);
    });

    return response.json({ message: SuccessMessages.SUCCESS });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return next(new CustomError(error.message, StatusCodes.BAD_REQUEST));
    }
    if (error instanceof ValidationError) {
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
      allowedEmployees, coins, name, subscriptionType, email,
    } = request.body;

    const businessEmployees = await getBusinessEmployeesForCompany(+id);

    const arrayOfValidEmails = await splitEmails(email);
    const emailsToUpdate = await differenceBetweenTwoArrays(
      businessEmployees.map((e) => e.email) as [],
      arrayOfValidEmails as [],
    );
    console.log('emailsToUpdate: ', emailsToUpdate);

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

export {
  sendAllCompanies, sendCompanyById, createCompany, updateCompany,
};
