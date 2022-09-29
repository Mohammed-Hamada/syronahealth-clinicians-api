import joi from 'joi';

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
