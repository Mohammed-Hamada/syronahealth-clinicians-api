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
  uploadToDisk,
  uploadToS3,
  checkEmployerUser,
} from '../middlewares';

const companyRouter = Router();

companyRouter.route('/').get(sendAllCompanies).post(createCompany);
companyRouter.patch('/:id', updateCompany);
companyRouter.post(
  '/:id/users',
  serverVars.NODE_ENV === 'production' ? uploadToS3 : uploadToDisk,
  createUsers,
);
companyRouter.use(checkEmployerUser);
companyRouter
  .get('/:id/users-engagements', sendUsersEngagementsForCompany)
  .get('/:id/users-interests', sendUsersInterestsForCompany)
  .get('/:id/users-health-conditions', sendUsersHealthConditionsForCompany)
  .get('/:id/employees-gender', sendEmployeesGenderForCompany)
  .get('/:id', sendCompanyById);

export default companyRouter;
