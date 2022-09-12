import { DataTypes } from 'sequelize';
import sequelize from '../connection';

const Auth0User = sequelize.define('Auth0User', {
  auth0UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

export default Auth0User;
