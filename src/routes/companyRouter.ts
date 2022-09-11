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
  superAdminCheck,
  uploadToDisk,
  uploadToS3,
} from '../middlewares';

const companyRouter = Router();

companyRouter
  .route('/')
  .get(superAdminCheck, sendAllCompanies)
  .post(createCompany);
companyRouter.route('/:id').get(sendCompanyById).patch(updateCompany);
companyRouter
  .route('/:id/users')
  .post(
    serverVars.NODE_ENV === 'production' ? uploadToS3 : uploadToDisk,
    createUsers,
  );
companyRouter.get('/:id/users-engagements', sendUsersEngagementsForCompany);
companyRouter.get('/:id/users-interests', sendUsersInterestsForCompany);
companyRouter.get(
  '/:id/users-health-conditions',
  sendUsersHealthConditionsForCompany,
);
companyRouter.get('/:id/employees-gender', sendEmployeesGenderForCompany);

export default companyRouter;
