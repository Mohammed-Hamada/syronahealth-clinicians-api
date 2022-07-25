import { ClientErrorsStatus } from '../interfaces/Errors';

class CustomError extends Error {
  status: ClientErrorsStatus;

  constructor(message: string, status: ClientErrorsStatus) {
    super(message);
    this.status = status;
  }
}

export default CustomError;
