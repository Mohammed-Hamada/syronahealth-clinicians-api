import { NextFunction, Request, Response } from 'express';

import { SuccessMessages } from '../enums';
import { ResponseShape } from '../interfaces';
import { getUsersEngagementsForCompany } from '../services';

const sendUsersEngagementsForCompany = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ResponseShape> | unknown> => {
  try {
    const { id } = req.params;
    const usersEngagements = await getUsersEngagementsForCompany(+id);
    return res.json({
      message: SuccessMessages.SUCCESS,
      data: usersEngagements,
    });
  } catch (error) {
    return next(error);
  }
};

export default sendUsersEngagementsForCompany;
