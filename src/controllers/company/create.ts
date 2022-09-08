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
import { validateCompany } from '../../helpers/validation';
import { ResponseShape, UserShape } from '../../interfaces';
import {
  addNewCompany,
  addNewUsers,
  getCompanyByUniqueCode,
  addNewEmployee,
  getUserFromMultipleEmails,
  getUsersInCompanies,
  updateUsers,
} from '../../services';

const createCompany = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
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

    const usersInCompanies = await getUsersInCompanies(
      existingUsers.map((user) => user.id as number),
    );

    const emailsToUpdate = await differenceBetweenTwoArrays(
      usersInCompanies.map((user) => user.email),
      existingUsers.map((user) => user.email),
    );

    const { updatedUsers } = await updateUsers(emailsToUpdate as Array<string>);

    if (usersInCompanies.length !== 0) {
      throw new CustomError(
        usersInCompanies.length === 1
          ? `This email address already exists: (${usersInCompanies[0]?.email})`
          : `These emails addresses already exists:  ${usersInCompanies
            .map((user) => `(${user?.email})`)
            .join(' ')}`,
        StatusCodes.BAD_REQUEST,
      );
    }

    const emailsToAdd = await differenceBetweenTwoArrays(
      emailsToUpdate,
      arrayOfValidEmails,
    );

    const arrayOfValidUsers = emailsToAdd.map(
      (userEmail: string | undefined) => ({
        email: userEmail,
        username: 'test',
        firstName: 'test',
        lastName: 'test',
        isStaff: false,
        isDeleted: false,
        isActive: false,
        isBusiness: true,
      }),
    );

    const company = await addNewCompany(validCompany);
    const users: Array<UserShape> = await addNewUsers(arrayOfValidUsers);

    updatedUsers.forEach(async (user) => {
      await addNewEmployee(user.id, company.id);
    });

    users.forEach(async (user): Promise<void> => {
      await addNewEmployee(user.id, company.id);
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

export default createCompany;
