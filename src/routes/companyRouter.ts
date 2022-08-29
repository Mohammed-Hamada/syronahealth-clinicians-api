import path from 'path';
import { Request, Router } from 'express';
import multer from 'multer';
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
import { serverVars } from '../config';

const upload = multer({
  storage: multer.diskStorage({
    destination: (_request: Request, _file: Express.Multer.File, callBack) => {
      callBack(
        null,
        serverVars.NODE_ENV === 'production'
          ? './uploads/'
          : './uploads-development',
      );
    },
    filename: (request: Request, file: Express.Multer.File, callBack) => {
      callBack(
        null,
        `company-${request.params.id}-${
          file.fieldname
        }-${Date.now()}${path.extname(file.originalname)}`,
      );
    },
  }),
  fileFilter: (_request: Request, file: Express.Multer.File, cb) => {
    // eslint-disable-next-line no-unused-expressions
    if (file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

const companyRouter = Router();
companyRouter.route('/').get(sendAllCompanies).post(createCompany);
companyRouter.route('/:id').get(sendCompanyById).patch(updateCompany);
companyRouter.route('/:id/users').post(upload.single('users'), createUsers);
companyRouter.get('/:id/users-engagements', sendUsersEngagementsForCompany);
companyRouter.get('/:id/users-interests', sendUsersInterestsForCompany);
companyRouter.get(
  '/:id/users-health-conditions',
  sendUsersHealthConditionsForCompany,
);
companyRouter.get('/:id/employees-gender', sendEmployeesGenderForCompany);

export default companyRouter;
