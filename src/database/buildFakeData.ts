import { databaseVars } from '../config';
import { companies, employees, users } from '../samples';
import sequelize from './connection';
import { Company, Employee, User } from './models';

const buildFakeData = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database has been synced successfully.');

    await User.bulkCreate(users);
    await Company.bulkCreate(companies);
    await Employee.bulkCreate(employees);
    console.log('Fake data has been created successfully.');
  } catch (error) {
    console.log(error);
  }
};

if (databaseVars.NODE_ENV === 'test') {
  buildFakeData();
}
