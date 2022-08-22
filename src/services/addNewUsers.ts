import { User } from '../database/models';
import { UserShape } from '../interfaces';

/**
 * This function add new users in database.
 * You can use this function to add one user or many users.
 * @param usersData - users data to be added to the database
 */
const addNewUsers = async (
  usersData: Array<Omit<UserShape, string>>,
): Promise<Array<UserShape>> => {
  const users = await User.bulkCreate(usersData);
  return users.map((user) => user.toJSON());
};

export default addNewUsers;
