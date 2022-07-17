import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const User = sequelize.define('User', {
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
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  is_business: DataTypes.BOOLEAN,
  agree_to_terms: DataTypes.BOOLEAN,
  agree_to_privacy: DataTypes.BOOLEAN,
  allow_data_sharing: DataTypes.BOOLEAN,
  db: DataTypes.STRING,
  dop: DataTypes.DATEONLY,
  coins: DataTypes.INTEGER,
});

export default User;

// customer - string (used for 3rd party integration)
// pb_id - string (used for 3rd party integration)
// access_code - string (used for 3rd party integration)
// NHS_number - string (used for 3rd party integration)
