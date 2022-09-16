import { Employee } from '../database/models';

/**
 * This function add the user to a specific company.
 */
const addNewEmployee = async (
  userId: number,
  companyId: number,
): Promise<void> => {
  await Employee.create({
    user: userId,
    corporate: companyId,
  });
};

export default addNewEmployee;
