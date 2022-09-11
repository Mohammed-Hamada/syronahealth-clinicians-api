import { Op } from 'sequelize';
import { Employee, User } from '../database/models';
import { UserShape } from '../interfaces';

const getUsersInCompanies = async (
  ids: Array<number>,
): Promise<Array<Partial<UserShape>>> => {
  const users = await Employee.findAll({
    where: {
      user: {
        [Op.in]: ids,
      },
    },
    attributes: {
      include: ['user', 'corporate', 'User.email'],
      exclude: ['id', 'timestamp', 'updated'],
    },
    raw: true,
    include: {
      model: User,
      required: true,
      attributes: [],
    },
  });
  return users as Array<Partial<UserShape>>;
};
export default getUsersInCompanies;
