import { databaseVars } from '../config';
import { sequelize } from './models';

const buildDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database has been synced successfully.');
  } catch (error) {
    console.log(error);
  }
};

if (databaseVars.NODE_ENV === 'development') {
  buildDatabase();
}
export default buildDatabase;
