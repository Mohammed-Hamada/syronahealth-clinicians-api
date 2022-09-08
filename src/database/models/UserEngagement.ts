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
      type: DataTypes.ARRAY(DataTypes.STRING(80)),
      defaultValue: [],
    },
  },
);

export default UserEngagement;
