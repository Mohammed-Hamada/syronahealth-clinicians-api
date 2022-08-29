import { StatusCodes } from 'http-status-codes';
import { ErrorsMessages } from '../enums';

type ClientErrorsStatus =
  | 400
  | 401
  | 402
  | 403
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 429;
interface ClientErrors extends Error {
  message: string;
  status: ClientErrorsStatus;
}

interface NotFoundError {
  status: StatusCodes.NOT_FOUND;
  message: ErrorsMessages.NOT_FOUND;
}

export { ClientErrors, NotFoundError, ClientErrorsStatus };
