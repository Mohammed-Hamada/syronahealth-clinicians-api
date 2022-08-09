import { Company, User, UserEngagement } from '../database/models';

const getUsersEngagementsForCompany = async (companyId: number): Promise<object> => {
  const usersEngagements = await Company.findByPk(companyId, {
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

  return {
    company: {
      id: usersEngagements?.getDataValue('id'),
      name: usersEngagements?.getDataValue('name'),
      usersEngagements: usersEngagements?.toJSON().Users.map(
        (user: {
        UserEngagements: Array<{
          id: number;
          engagements: [];
          user: number;
        }>;
      }) => ({
          id: user.UserEngagements[0].id,
          engagements: user.UserEngagements[0].engagements,
          user: user.UserEngagements[0].user,
        }),
      ),
    },
  };
};

export default getUsersEngagementsForCompany;
