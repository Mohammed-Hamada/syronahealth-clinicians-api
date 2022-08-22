import { databaseVars } from '../config';
import { sequelize } from './models';

const buildDatabase = async (): Promise<void> => {
  try {
    console.log('Database Building: building database...');
    await sequelize.sync({ force: true });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

if (
  databaseVars.NODE_ENV === 'development'
  || databaseVars.NODE_ENV === 'production'
) {
  buildDatabase();
  console.log('Database Building: database has been built successfully.');
}
export default buildDatabase;
