import joi from 'joi';

type DaysType = {
  days: number;
};
const validateDaysQueryParams = (object: DaysType): Promise<DaysType> => {
  const parameterSchema: joi.ObjectSchema<number> = joi.object().keys({
    days: joi.number().integer().valid(30, 60, 90),
  });

  const parameter = parameterSchema.validateAsync(object);
  return parameter;
};
export default validateDaysQueryParams;
