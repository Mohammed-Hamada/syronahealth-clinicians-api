import { Op } from 'sequelize';
import { User } from '../database/models';
import { UserShape } from '../interfaces';

const getUserFromMultipleEmails = async (
  emails: Array<string>,
): Promise<Array<UserShape>> => {
  const users = await User.findAll({
    where: {
      email: {
        [Op.in]: emails,
      },
    },
  });
  return users.map((user) => user.toJSON() as UserShape);
};
export default getUserFromMultipleEmails;
