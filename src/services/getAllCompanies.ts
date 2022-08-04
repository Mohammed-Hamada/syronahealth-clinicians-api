import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

const getAllCompanies = async (): Promise<Array<CompanyShape>> => {
  const companies = await Company.findAll();
  return companies as Array<CompanyShape>;
};

export default getAllCompanies;
