import sequelize from '../connection';
import Company from './Company';
import Employee from './Employee';
import User from './User';
import UserState from './UserState';

(async (): Promise<void> => {
  try {
    User.hasMany(UserState, { foreignKey: 'user' });

    User.belongsToMany(Company, { through: Employee, foreignKey: 'user' });
    Company.belongsToMany(User, { through: Employee, foreignKey: 'corporate' });

    User.hasMany(Employee);
    Company.hasMany(Employee);

    Employee.belongsTo(User);
    Employee.belongsTo(Company);

    console.log('Database built successfully!');
  } catch (error) {
    console.log(error);
  }
})();
export {
  Company, Employee, User, UserState, sequelize,
};
