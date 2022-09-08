import joi from 'joi';

/**
 * @param {{id: number}} object This is parameter object to validate
 * @returns {Promise<object>} Promise object represents the valid object
 */
const validateParameter = (object: {
  id: number | string;
}): Promise<{ id: number | string }> => {
  const parameterSchema: joi.ObjectSchema<number | string> = joi.object().keys({
    id: joi.number().integer().min(1).required(),
  });

  const parameter = parameterSchema.validateAsync(object);
  return parameter;
};

export default validateParameter;
