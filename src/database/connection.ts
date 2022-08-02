import { Sequelize } from 'sequelize';
import { databaseVars } from '../config';

const sequelize = new Sequelize(databaseVars.DATABASE_URL, {
  dialect: 'postgres',
  define: {
    underscored: true,
    createdAt: 'timestamp',
    updatedAt: 'updated',
  },
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});

export default sequelize;
