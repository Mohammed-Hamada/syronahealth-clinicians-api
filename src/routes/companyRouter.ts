import { Router } from 'express';
import {
  sendAllCompanies,
  sendCompanyById,
  sendEmployeesGenderForCompany,
  sendUsersEngagementsForCompany,
  sendUsersInterestsForCompany,
} from '../controllers';

const companyRouter = Router();
companyRouter.get('/', sendAllCompanies);
companyRouter.get('/:id', sendCompanyById);
companyRouter.get('/:id/users-engagements', sendUsersEngagementsForCompany);
companyRouter.get('/:id/users-interests', sendUsersInterestsForCompany);
companyRouter.get('/:id/employees-gender', sendEmployeesGenderForCompany);

export default companyRouter;
