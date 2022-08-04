import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const UserHealthCondition = sequelize.define('UserHealthCondition', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  healthConditions: {
    type: DataTypes.ARRAY(DataTypes.STRING(80)),
    defaultValue: [],
  },
});

export default UserHealthCondition;
