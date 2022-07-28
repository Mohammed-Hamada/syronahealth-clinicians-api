import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.CHAR(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.CHAR(60),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.CHAR(60),
    allowNull: false,
  },
  gender: {
    type: DataTypes.CHAR(60),
  },
  coins: {
    type: DataTypes.INTEGER,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  is_staff: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_superuser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_business: {
    type: DataTypes.BOOLEAN,
  },
});

export default User;

// customer - string (used for 3rd party integration)
// pb_id - string (used for 3rd party integration)
// access_code - string (used for 3rd party integration)
// NHS_number - string (used for 3rd party integration)
