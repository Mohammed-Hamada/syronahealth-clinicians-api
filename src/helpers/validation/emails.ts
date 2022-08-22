import joi from 'joi';

/**
 * @param object This is emails string separated by comma to validate
 * @returns {Promise<object>} Promise object represents the valid object
 */
const validateEmails = (object: {
  emails: string;
}): Promise<{ emails: string }> => {
  const emailsSchema: joi.ObjectSchema<string> = joi.object().keys({
    emails: joi
      .string()
      .email({ multiple: true })
      .message(
        object.emails.split(',').length > 1 ? 'Invalid emails' : 'Invalid email',
      )
      .required(),
  });

  const emails = emailsSchema.validateAsync(object);
  return emails;
};

export default validateEmails;
