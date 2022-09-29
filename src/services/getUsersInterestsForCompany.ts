import { UserInterest } from '../database/models';
import { CustomError } from '../helpers';
import getUsersStatesFromModel from './getUsersStatesFromModel';

const getUsersInterestsForCompany = async (
  companyId: number,
  options?: {
    days?: number;
  },
): Promise<object | string> => {
  const companyData = await getUsersStatesFromModel(companyId, UserInterest, {
    days: options?.days,
  });

  if (companyData.companyEmployeesCount === undefined) {
    throw new CustomError(`There is no company with id ${companyId}`, 400);
  }
  if (companyData.companyEmployeesCount === 0) {
    return {
      company: {
        id: companyId,
        totalInterests: [],
      },
    };
  }
  let interestsForAllUsers = [];
  interestsForAllUsers = companyData.companyEmployees.map((user) => {
    if (!user.UserInterests.length) {
      return { interests: [] };
    }
    return {
      interests: user.UserInterests[0].interests,
    };
  });

  const allInterestsArray: string[] = [];
  const interestsCounters: { [key: string]: number } = {};
  if (interestsForAllUsers.length) {
    interestsForAllUsers.forEach((interestsForOneUser) => {
      allInterestsArray.push(...interestsForOneUser.interests);
    });
  }
  allInterestsArray.forEach((interest) => {
    const key = interest.toLowerCase().split(' ').join('_');

    if (interestsCounters[key]) {
      interestsCounters[key] += 1;
    } else {
      interestsCounters[key] = 1;
    }
  });

  const arr = Object.entries(interestsCounters).map((element) => ({
    percentage: (element[1] / allInterestsArray.length) * 100,
    label: element[0]
      .split('_')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
  }));

  const sortedInterests = arr.sort((a, b) => b.percentage - a.percentage);
  const topThreeInterests = sortedInterests.slice(0, 3);
  const otherInterests = sortedInterests
    .slice(3)
    .reduce((acc, curr) => acc + curr.percentage, 0);

  const totalInterests = [
    ...topThreeInterests,
    { percentage: otherInterests, label: 'Others' },
  ];

  return {
    company: {
      id: companyId,
      totalInterests,
    },
  };
};

export default getUsersInterestsForCompany;
