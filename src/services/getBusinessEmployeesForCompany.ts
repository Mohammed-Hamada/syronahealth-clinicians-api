import { Employee, User } from '../database/models';

const getBusinessEmployeesForCompany = async (
  companyId: number,
): Promise<Array<{ email: string }>> => {
  const businessEmployees = await User.findAll({
    where: {
      isBusiness: true,
    },
    attributes: ['email'],
    include: {
      model: Employee,
      where: {
        corporate: companyId,
      },
      required: true,
      attributes: [],
    },
  });
  return businessEmployees.map((employee) => employee.toJSON()) as Array<{
    email: string;
  }>;
};

export default getBusinessEmployeesForCompany;
