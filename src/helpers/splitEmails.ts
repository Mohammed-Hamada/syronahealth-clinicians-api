import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError';
import { validateEmails } from './validation';

const splitEmails = async (emails: string): Promise<Array<string>> => {
  if (emails === undefined) {
    throw new CustomError('No email found', StatusCodes.BAD_REQUEST);
  }
  const emailAddressesSeparatedByComma: string = emails
    .replace(/[, ]+/g, ',')
    .trim();

  const { emails: validEmails } = await validateEmails({
    emails: emailAddressesSeparatedByComma,
  });

  const arrayOfValidEmails: Array<string> = validEmails.split(',');

  return arrayOfValidEmails;
};

export default splitEmails;
