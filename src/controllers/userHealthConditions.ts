import { NextFunction, Request, Response } from 'express';

import { SuccessMessages } from '../enums';
import { ResponseShape } from '../interfaces';
import { getUsersHealthConditionsForCompany } from '../services';

const sendUsersHealthConditionsForCompany = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const { id } = req.params;
    const usersInterests = await getUsersHealthConditionsForCompany(+id);
    return res.json({
      message: SuccessMessages.SUCCESS,
      data: usersInterests,
    });
  } catch (error) {
    return next(error);
  }
};

export default sendUsersHealthConditionsForCompany;
