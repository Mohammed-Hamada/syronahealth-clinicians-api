import { databaseVars } from '../config';
import { sequelize } from './models';

const buildDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
  } catch {
    console.log('Database build failed!');
  }
};

if (databaseVars.NODE_ENV === 'development') {
  buildDatabase();
}
export default buildDatabase;
