import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

const addNewCompany = async (
  companyData: Omit<CompanyShape, string>,
): Promise<CompanyShape> => {
  const company = await Company.create(companyData);
  return company.toJSON();
};

export default addNewCompany;
