import { Router } from 'express';
import {
  sendAllCompanies,
  sendCompanyById,
  sendUsersEngagementsForCompany,
  sendUsersInterestsForCompany,
} from '../controllers';

const companyRouter = Router();
companyRouter.get('/', sendAllCompanies);
companyRouter.get('/:id', sendCompanyById);
companyRouter.get('/:id/users-engagements', sendUsersEngagementsForCompany);
companyRouter.get('/:id/users-interests', sendUsersInterestsForCompany);

export default companyRouter;
