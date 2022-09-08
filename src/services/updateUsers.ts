import { Op } from 'sequelize';
import { User } from '../database/models';
import { UserShape } from '../interfaces';

const updateUsers = async (
  emails: Array<string>,
): Promise<{
  count: number;
  updatedUsers: Array<UserShape>;
}> => {
  const [count, updatedUsers] = await User.update(
    {
      isBusiness: true,
    },
    {
      where: {
        email: {
          [Op.in]: emails,
        },
      },
      returning: ['id', 'email', 'is_business'],
    },
  );
  return {
    count,
    updatedUsers: updatedUsers.map((user) => user?.toJSON()),
  };
};

export default updateUsers;
