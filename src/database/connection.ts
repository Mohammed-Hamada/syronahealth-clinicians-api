import { Sequelize } from 'sequelize';
import {
  DB_HOST, DB_PORT, DB_USER, DB_PSWD, DB_NAME,
} from '../config';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PSWD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: +DB_PORT,
  dialectOptions: {
    ssl: false,
  },
});

export default sequelize;
