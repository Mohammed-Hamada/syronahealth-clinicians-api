import { Employee } from '../database/models';

/**
 * This function add users to a specific company.
 */
const addNewEmployees = async (
  users: Array<{ userId: number; companyId: number }>,
): Promise<void> => {
  const employees = users.map((user) => ({ user: user.userId, corporate: user.companyId }));
  await Employee.bulkCreate(
    employees,
  );
};

export default addNewEmployees;
