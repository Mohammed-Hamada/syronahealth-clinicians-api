import { Router } from 'express';
import { sendAllCompanies, sendCompanyById } from '../controllers';

const companyRouter = Router();
companyRouter.get('/', sendAllCompanies);
companyRouter.get('/:id', sendCompanyById);
export default companyRouter;
