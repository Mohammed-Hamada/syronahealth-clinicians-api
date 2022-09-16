import { StatusCodes } from 'http-status-codes';
import { Company, Employee, User } from '../database/models';
import { CustomError } from '../helpers';

const getEmployeesGenderForCompany = async (
  companyId: number,
): Promise<object> => {
  const companiesCount = await Company.count({ where: { id: companyId } });
  if (!companiesCount) {
    throw new CustomError(
      `There is no company with id ${companyId}`,
      StatusCodes.BAD_REQUEST,
    );
  }

  const genderData = await User.findAndCountAll({
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
  if (!genderData.rows.length) {
    return {
      company: {
        id: companyId,
        employeesGender: [],
        employeesCount: 0,
      },
    };
  }
  const allGendersArray: string[] = [];
  genderData.rows.forEach((user) => {
    if (!user.toJSON().gender) {
      allGendersArray.push('Others');
    } else allGendersArray.push(user.toJSON().gender);
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

  const genderKeys = [
    'female',
    'male',
    'transfemale',
    'transmale',
    'none_or_agender',
    'others',
    'prefer_not_to_say',
  ];
  genderKeys.forEach((key) => {
    if (!genderCounters[key]) genderCounters[key] = 0;
  });

  const arr = Object.entries(genderCounters).map((element) => ({
    count: element[1],
    label: element[0]
      .split('_')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
  }));

  const [
    female,
    male,
    nonOrAgender,
    others,
    preferNotTosay,
    transfemale,
    transmale,
  ] = arr.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

  return {
    company: {
      id: companyId,
      employeesGender: [
        female,
        male,
        transfemale,
        transmale,
        nonOrAgender,
        others,
        preferNotTosay,
      ],
      employeesCount: genderData.count,
    },
  };
};

export default getEmployeesGenderForCompany;
