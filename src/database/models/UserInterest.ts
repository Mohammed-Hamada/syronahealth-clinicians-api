import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const UserInterest = sequelize.define(
  'UserInterest',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.STRING(80)),
      defaultValue: [],
    },
  },
);

export default UserInterest;
