import { Request, Response } from 'express';
import { ResponseShape } from '../interfaces';
import getAllCompanies from '../services';

const sendAllCompanies = async (
  _request: Request,
  response: Response,
): Promise<Response<ResponseShape>> => {
  const companies = getAllCompanies();
  return response.json({ message: 'Success', data: companies });
};

export default sendAllCompanies;
