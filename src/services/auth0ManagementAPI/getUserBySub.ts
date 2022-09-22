import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { authVars } from '../../config';

// interface IGetAuthRequest extends Request {
//   auth: {
//     sub: string;
//   };
// }

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
      data: { email },
    } = await axios.get(
      `https://${authVars.AUTH0_DOMAIN}/api/v2/users/${sub}?fields=email`,
      {
        headers: {
          Authorization: `Bearer ${auth0ManagementApiToken}`,
        },
      },
    );
    if (!email) {
      throw new Error('Server Error');
    } else {
      response.locals.userEmail = email;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default getUserBySub;
