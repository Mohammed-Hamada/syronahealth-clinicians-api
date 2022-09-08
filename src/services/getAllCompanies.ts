import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

const getAllCompanies = async (): Promise<Array<CompanyShape>> => {
  const companies = await Company.findAll({ raw: true });
  return companies as Array<CompanyShape>;
};

export default getAllCompanies;
