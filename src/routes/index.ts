import { Router } from 'express';
import companyRouter from './companyRouter';

const router = Router();

router.use('/companies', companyRouter);

export default router;
