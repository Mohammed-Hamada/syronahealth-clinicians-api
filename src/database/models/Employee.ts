import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Employee = sequelize.define('Employee', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Employee;
