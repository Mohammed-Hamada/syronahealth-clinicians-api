import { UserEngagement } from '../database/models';
import CustomError from '../helpers';
import getUsersStatesFromModel from './getUsersStatesFromModel';

const getUsersEngagementsForCompany = async (
  companyId: number,
): Promise<object | string> => {
  const companyData = await getUsersStatesFromModel(companyId, UserEngagement);
  if (!companyData) {
    throw new CustomError(`There is no company with id ${companyId}`, 400);
  }
  if (companyData.get({ plain: true }).Users.length === 0) {
    return {
      company: {
        id: companyData?.getDataValue('id'),
        name: companyData?.getDataValue('name'),
        totalEngagements: [],
      },
    };
  }

  let engagementsForAllUsers: [] = [];
  engagementsForAllUsers = companyData?.toJSON().Users.map(
    (user: {
      UserEngagements: Array<{
        engagements: [];
      }>;
    }) => {
      if (!user.UserEngagements.length) {
        return { engagements: [] };
      }
      return {
        engagements: user.UserEngagements[0].engagements,
      };
    },
  );

  const allEngagementsArray: string[] = [];
  const engagementsCounters: { [key: string]: number } = {};
  if (engagementsForAllUsers.length) {
    engagementsForAllUsers.forEach(
      (engagementsForOneUser: { engagements: [] }) => {
        allEngagementsArray.push(...engagementsForOneUser.engagements);
      },
    );
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
    counter: Math.round((element[1] / allEngagementsArray.length) * 100),
    label: element[0]
      .split('_')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
  }));

  const sortedEngagements = arr.sort((a, b) => b.counter - a.counter);
  const topThreeEngagements = sortedEngagements.slice(0, 3);
  const othersEngagements = sortedEngagements
    .slice(3)
    .reduce((acc, curr) => acc + curr.counter, 0);

  const totalEngagements = [
    ...topThreeEngagements,
    { counter: othersEngagements, label: 'Others' },
  ];

  return {
    company: {
      id: companyData?.getDataValue('id'),
      name: companyData?.getDataValue('name'),
      totalEngagements,
    },
  };
};

export default getUsersEngagementsForCompany;
