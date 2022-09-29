import joi from 'joi';

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
