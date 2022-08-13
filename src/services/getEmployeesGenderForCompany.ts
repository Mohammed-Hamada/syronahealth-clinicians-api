import { Employee, User } from '../database/models';
import CustomError from '../helpers';

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
  if (!genderData.length) {
    throw new CustomError(`There is no company with id ${companyId}`, 400);
  }

  const allGendersArray: string[] = [];
  genderData.forEach((user) => {
    allGendersArray.push(user.toJSON().gender);
  });
  const genderCounters: { [key: string]: number } = {};
  allGendersArray.forEach((gender) => {
    const key = gender.toLowerCase().split(' ').join('_');

    if (genderCounters[key]) {
      genderCounters[key] += 1;
    } else {
      genderCounters[key] = 1;
    }
  });
  const arr = Object.entries(genderCounters).map((element) => ({
    count: Math.round((element[1] / allGendersArray.length) * 100),
    label: element[0]
      .split('_')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
  }));

  return {
    company: {
      id: companyId,
      employeesGender: arr,
    },
  };
};

export default getEmployeesGenderForCompany;
