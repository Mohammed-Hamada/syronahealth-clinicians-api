import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

/**
 * This function updates existing company in database.
 * @param companyData - company data to be updated in the database
 * @param companyId - company id to be updated
 */
const updateExistingCompany = async (
  companyData: Omit<CompanyShape, string>,
  companyId: number,
): Promise<number> => {
  const updatedCompany = await Company.update(companyData, {
    where: { id: companyId },
  });
  return updatedCompany[0];
};

export default updateExistingCompany;
