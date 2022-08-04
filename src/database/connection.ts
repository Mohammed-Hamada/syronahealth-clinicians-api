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
  pool: {
    max: 5,
    min: 0,
    idle: 5000,
  },
  logging: false,
});

export default sequelize;
