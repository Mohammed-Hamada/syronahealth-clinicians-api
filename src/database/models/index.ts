import sequelize from '../connection';
import Auth0Company from './Auth0Company';
import Auth0User from './Auth0User';
import Company from './Company';
import Employee from './Employee';
import User from './User';
import UserEngagement from './UserEngagement';
import UserHealthCondition from './UserHealthCondition';
import UserInterest from './UserInterest';

(async (): Promise<void> => {
  try {
    User.hasMany(UserEngagement, { foreignKey: 'user' });
    User.hasMany(UserHealthCondition, { foreignKey: 'user' });
    User.hasMany(UserInterest, { foreignKey: 'user' });
    UserEngagement.belongsTo(User, { foreignKey: 'user' });
    UserHealthCondition.belongsTo(User, { foreignKey: 'user' });
    UserInterest.belongsTo(User, { foreignKey: 'user' });

    User.hasOne(Auth0User, { foreignKey: 'user' });
    Auth0User.belongsTo(User, { foreignKey: 'user' });
    Company.hasOne(Auth0Company, { foreignKey: 'corporate' });
    Auth0Company.belongsTo(Company, { foreignKey: 'corporate' });

    User.belongsToMany(Company, { through: Employee, foreignKey: 'user' });
    Company.belongsToMany(User, {
      through: Employee,
      foreignKey: 'corporate',
    });
    User.hasMany(Employee, { foreignKey: 'user' });
    Company.hasMany(Employee, { foreignKey: 'corporate' });
    Employee.belongsTo(User, { foreignKey: 'user' });
    Employee.belongsTo(Company, { foreignKey: 'corporate' });
  } catch (error) {
    throw new Error(
      'Error while build an associations between database models',
    );
  }
})();
export {
  Company,
  Employee,
  User,
  UserEngagement,
  UserInterest,
  UserHealthCondition,
  sequelize,
};
