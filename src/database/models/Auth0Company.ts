import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Auth0Company = sequelize.define('Auth0Company', {
  auth0OrganizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

export default Auth0Company;
