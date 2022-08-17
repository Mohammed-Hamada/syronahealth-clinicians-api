import { Router } from 'express';
import {
  createCompany,
  sendAllCompanies,
  sendCompanyById,
  sendEmployeesGenderForCompany,
  sendUsersEngagementsForCompany,
  sendUsersHealthConditionsForCompany,
  sendUsersInterestsForCompany,
  updateCompany,
} from '../controllers';

const companyRouter = Router();
companyRouter.route('/').get(sendAllCompanies).post(createCompany);
companyRouter.route('/:id').get(sendCompanyById).patch(updateCompany);
companyRouter.get('/:id/users-engagements', sendUsersEngagementsForCompany);
companyRouter.get('/:id/users-interests', sendUsersInterestsForCompany);
companyRouter.get(
  '/:id/users-health-conditions',
  sendUsersHealthConditionsForCompany,
);
companyRouter.get('/:id/employees-gender', sendEmployeesGenderForCompany);

export default companyRouter;
