import {
  createCompany,
  sendAllCompanies,
  sendCompanyById,
  updateCompany,
} from './companies';
import sendEmployeesGenderForCompany from './employeesGender';
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
};
