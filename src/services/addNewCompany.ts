import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

/**
 * This function add new company in database.
 * @param companyData - company data to be added to the database
 */
const addNewCompany = async (
  companyData: Omit<CompanyShape, string>,
): Promise<CompanyShape> => {
  const company = await Company.create(companyData);
  return company.toJSON();
};

export default addNewCompany;
