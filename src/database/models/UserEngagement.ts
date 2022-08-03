import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const UserEngagement = sequelize.define(
  'UserEngagement',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    engagements: {
      type: DataTypes.ARRAY(DataTypes.CHAR(80)),
      defaultValue: [],
    },
  },
);

export default UserEngagement;
