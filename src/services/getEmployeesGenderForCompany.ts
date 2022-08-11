import { Employee, User } from '../database/models';

const getEmployeesGenderForCompany = async (
  companyId: number,
): Promise<object> => {
  const genderData = await User.findAll({
    include: {
      model: Employee,
      where: {
        corporate: companyId,
      },
      required: true,
      attributes: [],
    },
    attributes: ['gender'],
  });

  return genderData;
};

export default getEmployeesGenderForCompany;
