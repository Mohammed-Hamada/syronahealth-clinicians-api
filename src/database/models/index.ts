import sequelize from '../connection';
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
    console.log(error);
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
