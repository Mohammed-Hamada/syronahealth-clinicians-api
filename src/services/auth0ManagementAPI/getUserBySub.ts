import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authVars } from '../../config';
import { CustomError } from '../../helpers';
import { updateUserByEmail } from '..';

const getUserBySub = async (
  request: Request | any,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { sub } = request.auth;
  const {
    auth0ManagementAPIData: { access_token: auth0ManagementApiToken },
  } = response.locals;
  try {
    const {
      data: { email, email_verified: isVerified },
    } = await axios.get(
      `https://${authVars.AUTH0_DOMAIN}/api/v2/users/${sub}?fields=email%2Cemail_verified`,
      {
        headers: {
          Authorization: `Bearer ${auth0ManagementApiToken}`,
        },
      },
    );
    if (!email) {
      throw new Error('Server Error');
    } else if (isVerified) {
      await updateUserByEmail(email);
      response.locals.userEmail = email;
      next();
    } else {
      throw new CustomError(
        'Your email is not verified',
        StatusCodes.BAD_REQUEST,
      );
    }
  } catch (error) {
    next(error);
  }
};

export default getUserBySub;
