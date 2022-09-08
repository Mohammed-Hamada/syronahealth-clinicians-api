import joi from 'joi';
import { CompanyShape } from '../../interfaces';

/**
 * @param {CompanyShape} object This is company object to validate
 * @returns {Promise<object>} Promise object represents the valid object
 */
const validateCompany = (object: CompanyShape): Promise<CompanyShape> => {
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
      allowedEmployees: joi.when('type', {
        is: 'add',
        then: joi.number().integer().min(1).required(),
        otherwise: joi.number().integer(),
      }),
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
