import joi from 'joi';
import { UserShape } from '../../interfaces';

/**
 * @param {UserShape} object This is user object to validate
 * @returns {Promise<object>} Promise object represents the valid object
 */
const validateUser = (object: UserShape): Promise<object> => {
  const userSchema: joi.ObjectSchema<string | boolean | number | Date> = joi
    .object()
    .keys({
      type: joi.string().required().valid('add', 'update'),
      username: joi.when('type', {
        is: 'add',
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      email: joi.when('type', {
        is: 'add',
        then: joi.string().email().required(),
        otherwise: joi.string().email(),
      }),
      first_name: joi.when('type', {
        is: 'add',
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      last_name: joi.when('type', {
        is: 'add',
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      // db: joi.string(),
      // dob: joi.date().greater('1-1-1900').less('now'),
      coins: joi.number().integer(),
      is_staff: joi.boolean(),
      // is_superuser: joi.boolean(),
      is_deleted: joi.boolean().default(false),
      is_active: joi.when('is_deleted', {
        is: true,
        then: joi.boolean().default(false),
      }),
      is_business: joi.boolean(),
      agree_to_terms: joi.boolean(),
      agree_to_privacy: joi.boolean(),
      allow_data_sharing: joi.boolean(),
    });
  return userSchema.validateAsync(object);
};

export default validateUser;
