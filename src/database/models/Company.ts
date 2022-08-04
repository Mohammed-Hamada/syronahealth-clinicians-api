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
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required',
      },
      len: {
        args: [1, 60],
        msg: 'Name must be between 1 and 60 characters',
      },
    },
  },
  uniqueCode: {
    type: DataTypes.CHAR(6),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Unique code is required',
      },
      len: {
        args: [6, 6],
        msg: 'Unique code must be 6 characters',
      },
    },
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
