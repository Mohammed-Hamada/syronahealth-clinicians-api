import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

const getCompanyById = async (id: number): Promise<CompanyShape> => {
  const company = await Company.findByPk(id);
  return company as CompanyShape;
};
export default getCompanyById;
