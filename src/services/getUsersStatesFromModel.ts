import { Model, ModelStatic } from 'sequelize';
import { Company, User } from '../database/models';

const getUsersStatesFromModel = async (
  companyId: number,
  from: ModelStatic<Model>,
): Promise<Model | null> => {
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
  return companyData;
};

export default getUsersStatesFromModel;
