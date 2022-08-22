import { UserHealthCondition } from '../database/models';
import { CustomError } from '../helpers';
import getUsersStatesFromModel from './getUsersStatesFromModel';

const getUsersHealthConditionsForCompany = async (
  companyId: number,
): Promise<object | string> => {
  const companyData = await getUsersStatesFromModel(
    companyId,
    UserHealthCondition,
  );
  if (!companyData) {
    throw new CustomError(`There is no company with id ${companyId}`, 400);
  }
  if (companyData.get({ plain: true }).Users.length === 0) {
    return {
      company: {
        id: companyData?.getDataValue('id'),
        name: companyData?.getDataValue('name'),
        totalHealthConditions: [],
      },
    };
  }

  let healthConditionsForAllUsers: [] = [];
  healthConditionsForAllUsers = companyData?.toJSON().Users.map(
    (user: {
      UserHealthConditions: Array<{
        healthConditions: [];
      }>;
    }) => {
      if (!user.UserHealthConditions.length) {
        return { healthConditions: [] };
      }
      return {
        healthConditions: user.UserHealthConditions[0].healthConditions,
      };
    },
  );

  const allHealthConditionsArray: string[] = [];
  const healthConditionsCounters: { [key: string]: number } = {};
  if (healthConditionsForAllUsers.length) {
    healthConditionsForAllUsers.forEach(
      (healthConditionsForOneUser: { healthConditions: [] }) => {
        allHealthConditionsArray.push(...healthConditionsForOneUser.healthConditions);
      },
    );
  }

  allHealthConditionsArray.forEach((engagement) => {
    const key = engagement.toLowerCase().split(' ').join('_');

    if (healthConditionsCounters[key]) {
      healthConditionsCounters[key] += 1;
    } else {
      healthConditionsCounters[key] = 1;
    }
  });

  const arr = Object.entries(healthConditionsCounters).map((element) => ({
    percentage: (element[1] / allHealthConditionsArray.length) * 100,
    label: element[0]
      .split('_')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
  }));

  const sortedHealthConditions = arr.sort(
    (a, b) => b.percentage - a.percentage,
  );
  const topThreeHealthConditions = sortedHealthConditions.slice(0, 3);

  return {
    company: {
      id: companyData?.getDataValue('id'),
      name: companyData?.getDataValue('name'),
      topThreeHealthConditions,
      allHealthConditions: arr,
    },
  };
};

export default getUsersHealthConditionsForCompany;
