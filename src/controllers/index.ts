import {
  createCompany,
  sendAllCompanies,
  sendCompanyById,
  updateCompany,
} from './company/companies';
import sendEmployeesGenderForCompany from './employeesGender';
import createUsers from './user';
import sendUsersEngagementsForCompany from './userEngagements';
import sendUsersHealthConditionsForCompany from './userHealthConditions';
import sendUsersInterestsForCompany from './userInterests';

export {
  sendAllCompanies,
  sendCompanyById,
  sendUsersEngagementsForCompany,
  sendUsersInterestsForCompany,
  sendEmployeesGenderForCompany,
  sendUsersHealthConditionsForCompany,
  createCompany,
  updateCompany,
  createUsers,
};
