import { Router } from 'express';
import { serverVars } from '../config';
import {
  createCompany,
  createUsers,
  sendAllCompanies,
  sendCompanyById,
  sendEmployeesGenderForCompany,
  sendUsersEngagementsForCompany,
  sendUsersHealthConditionsForCompany,
  sendUsersInterestsForCompany,
  updateCompany,
} from '../controllers';
import {
  employerUserCheck,
  superAdminCheck,
  uploadToDisk,
  uploadToS3,
} from '../middlewares';

const companyRouter = Router();

companyRouter
  .use(employerUserCheck)
  .get('/:id/users-engagements', sendUsersEngagementsForCompany)
  .get('/:id/users-interests', sendUsersInterestsForCompany)
  .get('/:id/users-health-conditions', sendUsersHealthConditionsForCompany)
  .get('/:id/employees-gender', sendEmployeesGenderForCompany);

companyRouter.use(superAdminCheck);
companyRouter.route('/').get(sendAllCompanies).post(createCompany);
companyRouter.route('/:id').get(sendCompanyById).patch(updateCompany);
companyRouter.post(
  '/:id/users',
  serverVars.NODE_ENV === 'production' ? uploadToS3 : uploadToDisk,
  createUsers,
);

export default companyRouter;
