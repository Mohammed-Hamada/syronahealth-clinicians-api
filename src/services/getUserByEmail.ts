import { User } from '../database/models';
import { UserShape } from '../interfaces';

const getUserByEmail = async (email: string): Promise<UserShape> => {
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: {
      exclude: ['gender', 'coins', 'timestamp', 'updated'],
    },
  });
  return user?.toJSON() as UserShape;
};
export default getUserByEmail;
