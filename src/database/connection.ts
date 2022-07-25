import { Sequelize } from 'sequelize';
import { databaseVars } from '../config';

const sequelize = new Sequelize(databaseVars.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

export default sequelize;
