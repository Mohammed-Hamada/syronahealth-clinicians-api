import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { authVars } from '../../config';

const auth0ManagementAPI = async (
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { data } = await axios.post(
      `https://${authVars.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: authVars.CLIENT_ID,
        client_secret: authVars.CLIENT_SECRET,
        audience: `https://${authVars.AUTH0_DOMAIN}/api/v2/`,
        grant_type: authVars.GRANT_TYPE,
      },
    );
    response.locals.auth0ManagementAPIData = data;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth0ManagementAPI;
