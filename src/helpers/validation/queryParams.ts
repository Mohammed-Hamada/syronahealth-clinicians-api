import joi from 'joi';
import { ValidateParams } from '../../interfaces';

const validateParam = (params: ValidateParams): Promise<ValidateParams> => {
  const queryParamsSchema = joi.object().keys({
    q: joi
      .string()
      .valid(
        'top_features_used',
        'top_topics_of_interest',
        'health_conditions',
        'gender',
      )
      .required(),
  });

  return queryParamsSchema.validateAsync(params);
};
export default validateParam;
