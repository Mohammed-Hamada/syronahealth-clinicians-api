import { Model, ModelStatic } from 'sequelize';
import { Company, User } from '../database/models';
import { CompanyStatusShape } from '../interfaces';

const getUsersStatesFromModel = async (
  companyId: number,
  from: ModelStatic<Model>,
): Promise<CompanyStatusShape> => {
  const companyData = await Company.findByPk(companyId, {
    attributes: ['id'],
    include: [
      {
        model: User,
        attributes: ['id'],
        duplicating: false,
        include: [
          {
            model: from,
          },
        ],
      },
    ],
  });

  return {
    companyEmployees: companyData?.toJSON().Users,
    companyEmployeesCount: companyData?.toJSON().Users.length,
  };
};

export default getUsersStatesFromModel;
