import { Router } from 'express';
import {
  createCompany,
  sendAllCompanies,
  sendCompanyById,
  sendEmployeesGenderForCompany,
  sendUsersEngagementsForCompany,
  sendUsersHealthConditionsForCompany,
  sendUsersInterestsForCompany,
} from '../controllers';

const companyRouter = Router();
companyRouter.get('/', sendAllCompanies).post('/', createCompany);
companyRouter.get('/:id', sendCompanyById);
companyRouter.get('/:id/users-engagements', sendUsersEngagementsForCompany);
companyRouter.get('/:id/users-interests', sendUsersInterestsForCompany);
companyRouter.get(
  '/:id/users-health-conditions',
  sendUsersHealthConditionsForCompany,
);
companyRouter.get('/:id/employees-gender', sendEmployeesGenderForCompany);

export default companyRouter;
