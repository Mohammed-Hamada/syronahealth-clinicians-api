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
    unique: {
      msg: 'unique code is already in use',
      name: 'uniqueCode',
    },
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
  subscriptionType: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    validate: {
      isIn: {
        args: [['1', '2']],
        msg: 'Subscription type must be 1 for lite or 2 for premium',
      },
      notEmpty: {
        msg: 'Subscription type is required',
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
