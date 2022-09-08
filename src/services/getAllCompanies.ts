import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

const getAllCompanies = async (): Promise<Array<Partial<CompanyShape>>> => {
  const companies = await Company.findAll({ raw: true });
  return companies as Array<Partial<CompanyShape>>;
};

export default getAllCompanies;
