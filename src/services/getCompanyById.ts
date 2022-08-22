import { StatusCodes } from 'http-status-codes';
import { Company } from '../database/models';
import { CustomError } from '../helpers';
import { CompanyShape } from '../interfaces';

const getCompanyById = async (id: number): Promise<CompanyShape> => {
  const company = await Company.findByPk(id);
  if (!company) {
    throw new CustomError(`There is no company with id ${id}`, StatusCodes.BAD_REQUEST);
  }
  return company.toJSON() as CompanyShape;
};
export default getCompanyById;
