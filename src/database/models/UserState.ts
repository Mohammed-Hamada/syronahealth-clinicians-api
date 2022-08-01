import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const UserState = sequelize.define('UserState', {
  customSymptoms: {
    type: DataTypes.ARRAY(DataTypes.CHAR(50)),
    defaultValue: [],
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.CHAR(50)),
    defaultValue: [],
  },
});

export default UserState;
