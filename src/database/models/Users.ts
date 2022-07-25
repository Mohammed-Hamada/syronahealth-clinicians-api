import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  isStaff: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isSuperuser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBusiness: {
    type: DataTypes.BOOLEAN,
  },
  agree_to_terms: {
    type: DataTypes.BOOLEAN,
  },
  agree_to_privacy: {
    type: DataTypes.BOOLEAN,
  },
  allow_data_sharing: {
    type: DataTypes.BOOLEAN,
  },
  profilePicture: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATEONLY,
  },
  coins: {
    type: DataTypes.INTEGER,
  },
});

export default Users;
// Paranoid sequlize

// customer - string (used for 3rd party integration)
// pb_id - string (used for 3rd party integration)
// access_code - string (used for 3rd party integration)
// NHS_n umber - string (used for 3rd party integration)
