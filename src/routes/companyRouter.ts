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
import { uploadToDisk, uploadToS3 } from '../middlewares';

const companyRouter = Router();
companyRouter.route('/').get(sendAllCompanies).post(createCompany);
companyRouter.route('/:id').get(sendCompanyById).patch(updateCompany);
companyRouter
  .route('/:id/users')
  .post(
    serverVars.NODE_ENV === 'production'
      ? uploadToS3.single('users')
      : uploadToDisk.single('users'),
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
