import moment from 'moment';
import { Model, ModelStatic, Op } from 'sequelize';
import { Company, User } from '../database/models';
import { CompanyStatusShape } from '../interfaces';

const getUsersStatesFromModel = async (
  companyId: number,
  from: ModelStatic<Model>,
  options?: {
    days?: number;
  },
): Promise<CompanyStatusShape> => {
  const where = options?.days
    ? {
      timestamp: {
        [Op.gte]: moment().subtract(options.days, 'days').toDate(),
      },
    }
    : undefined;
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
            where: where || {},
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
