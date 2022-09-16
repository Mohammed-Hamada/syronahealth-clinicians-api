import { Company } from '../database/models';
import { CompanyShape } from '../interfaces';

const getCompanyByUniqueCode = async (uniqueCode: string): Promise<CompanyShape> => {
  const company = await Company.findOne({
    where: { uniqueCode },
  });
  return company?.toJSON() as CompanyShape;
};

export default getCompanyByUniqueCode;
