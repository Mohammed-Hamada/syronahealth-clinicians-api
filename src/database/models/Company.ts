import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.CHAR(60),
    allowNull: false,
  },
  uniqueCode: {
    type: DataTypes.CHAR(6),
    allowNull: false,
    unique: true,
  },
  allowedEmployees: {
    type: DataTypes.INTEGER,
  },
  coins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  registeredEmployees: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Company;
