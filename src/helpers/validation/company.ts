import joi from 'joi';
import { CompanyShape } from '../../interfaces';

const validateCompany = (object: Partial<CompanyShape>): Promise<Partial<CompanyShape>> => {
  const companySchema: joi.ObjectSchema<string | boolean | number | Date> = joi
    .object()
    .keys({
      type: joi.string().required().valid('add', 'update'),
      name: joi.when('type', {
        is: 'add',
        then: joi.string().max(60).required(),
        otherwise: joi.string(),
      }),
      uniqueCode: joi.when('type', {
        is: 'add',
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      subscriptionType: joi.when('type', {
        is: 'add',
        then: joi.string().valid('1', '2').required(),
        otherwise: joi.string(),
      }),
      allowedEmployees: joi.number().integer(),
      coins: joi.when('type', {
        is: 'add',
        then: joi.number().integer().default(0).min(0),
        otherwise: joi.number().integer(),
      }),
      registeredEmployees: joi.when('type', {
        is: 'add',
        then: joi.number().integer().default(0).min(0),
        otherwise: joi.number().integer(),
      }),
    });

  const company = companySchema.validateAsync(object);
  return company;
};

export default validateCompany;
