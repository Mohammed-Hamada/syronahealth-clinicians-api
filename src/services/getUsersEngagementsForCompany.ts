import { UserEngagement } from '../database/models';
import { CustomError } from '../helpers';
import getUsersStatesFromModel from './getUsersStatesFromModel';

const getUsersEngagementsForCompany = async (
  companyId: number,
  options?: {
    days?: number;
  },
): Promise<object | string> => {
  const companyData = await getUsersStatesFromModel(companyId, UserEngagement, {
    days: options?.days,
  });
  if (companyData.companyEmployeesCount === undefined) {
    throw new CustomError(`There is no company with id ${companyId}`, 400);
  }
  if (companyData.companyEmployeesCount === 0) {
    return {
      company: {
        id: companyId,
        totalEngagements: [],
      },
    };
  }

  let engagementsForAllUsers = [];
  engagementsForAllUsers = companyData.companyEmployees.map((user) => {
    if (!user.UserEngagements.length) {
      return { engagements: [] };
    }
    return {
      engagements: user.UserEngagements[0].engagements,
    };
  });

  const allEngagementsArray: string[] = [];
  const engagementsCounters: { [key: string]: number } = {};
  if (engagementsForAllUsers.length) {
    engagementsForAllUsers.forEach((engagementsForOneUser) => {
      allEngagementsArray.push(...engagementsForOneUser.engagements);
    });
  }

  allEngagementsArray.forEach((engagement) => {
    const key = engagement.toLowerCase().split(' ').join('_');

    if (engagementsCounters[key]) {
      engagementsCounters[key] += 1;
    } else {
      engagementsCounters[key] = 1;
    }
  });

  const arr = Object.entries(engagementsCounters).map((element) => ({
    percentage: (element[1] / allEngagementsArray.length) * 100,
    label: element[0]
      .split('_')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
  }));

  const sortedEngagements = arr.sort((a, b) => b.percentage - a.percentage);
  const topThreeEngagements = sortedEngagements.slice(0, 3);
  const otherEngagements = sortedEngagements
    .slice(3)
    .reduce((acc, curr) => acc + curr.percentage, 0);

  const totalEngagements = [
    ...topThreeEngagements,
    { percentage: otherEngagements, label: 'Others' },
  ];

  return {
    company: {
      id: companyId,
      totalEngagements,
    },
  };
};

export default getUsersEngagementsForCompany;
