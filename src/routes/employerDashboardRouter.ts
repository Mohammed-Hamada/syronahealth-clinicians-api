import { Router } from 'express';
import employeesData from '../controllers';

const employerDashboardRouter = Router();

employerDashboardRouter.get('/company', employeesData);

export default employerDashboardRouter;
