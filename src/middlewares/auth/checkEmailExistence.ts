import { NextFunction, Request, Response } from 'express';
import { getUserByEmail } from '../../services';

const checkEmailExistence = async (
  request: Request | any,
  response: Response,
  _next: NextFunction,
): Promise<void> => {
  console.log('request.auth: ', request.auth);

  const email = await getUserByEmail(request.auth.email);
  console.log('email: ', email);
  response.json('hello');
};

export default checkEmailExistence;
