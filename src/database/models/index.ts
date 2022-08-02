import sequelize from '../connection';
import Company from './Company';
import Employee from './Employee';
import User from './User';
import UserState from './UserState';

(async (): Promise<void> => {
  try {
    User.hasMany(UserState);
    UserState.belongsTo(User);

    User.belongsToMany(Company, { through: Employee, foreignKey: 'user_id' });
    Company.belongsToMany(User, { through: Employee, foreignKey: 'company_id' });
    User.hasMany(Employee);
    Company.hasMany(Employee);
    Employee.belongsTo(User);
    Employee.belongsTo(Company);
  } catch (error) {
    console.log(error);
  }
})();
export {
  Company, Employee, User, UserState, sequelize,
};
