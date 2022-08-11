import { databaseVars } from '../config';
import {
  companies,
  employees,
  users,
  usersEngagements,
  usersHealthConditions,
  usersInterests,
} from '../samples';
import {
  Company, Employee, sequelize, User, UserEngagement, UserHealthCondition, UserInterest,
} from './models';

const buildFakeData = async (): Promise<void> => {
  try {
    console.log('Database Building: building fake data...');
    await sequelize.sync({ force: true });
    await User.bulkCreate(users);
    await Company.bulkCreate(companies);
    await Employee.bulkCreate(employees);
    await UserEngagement.bulkCreate(usersEngagements);
    await UserInterest.bulkCreate(usersInterests);
    await UserHealthCondition.bulkCreate(usersHealthConditions);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

if (databaseVars.NODE_ENV === 'development' || databaseVars.NODE_ENV === 'production') {
  buildFakeData();
  console.log('Database Building: fake data has been built successfully.');
}

export default buildFakeData;
