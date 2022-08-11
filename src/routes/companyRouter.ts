import { Router } from 'express';
import {
  sendAllCompanies,
  sendCompanyById,
  sendUsersEngagementsForCompany,
} from '../controllers';

const companyRouter = Router();
companyRouter.get('/', sendAllCompanies);
companyRouter.get('/:id', sendCompanyById);
companyRouter.get('/:id/users-engagements', sendUsersEngagementsForCompany);

export default companyRouter;
