import { User } from '../database/models';

const updateUserByEmail = async (
  email: Array<string>,
): Promise<void> => {
  await User.update(
    {
      isActive: true,
    },
    {
      where: {
        email,
      },
    },
  );
};

export default updateUserByEmail;
