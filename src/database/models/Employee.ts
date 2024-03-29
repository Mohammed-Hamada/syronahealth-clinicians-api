import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

export default Employee;
