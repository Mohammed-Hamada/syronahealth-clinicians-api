import { Company, User, UserEngagement } from '../database/models';

const getUsersEngagementsForCompany = async (
  companyId: number,
): Promise<object> => {
  const companyData = await Company.findByPk(companyId, {
    attributes: ['id'],
    include: [
      {
        model: User,
        attributes: ['id'],
        duplicating: false,
        include: [
          {
            model: UserEngagement,
          },
        ],
      },
    ],
  });

  const engagementsForAllUsers: [] = companyData?.toJSON().Users.map(
    (user: {
      UserEngagements: Array<{
        engagements: [];
      }>;
    }) => ({
      engagements: user.UserEngagements[0].engagements,
    }),
  );

  const allEngagementsArray: string[] = [];
  const engagementsCounters: { [key: string]: number } = {};

  engagementsForAllUsers.forEach(
    (engagementsForOneUser: { engagements: [] }) => {
      allEngagementsArray.push(...engagementsForOneUser.engagements);
    },
  );

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
