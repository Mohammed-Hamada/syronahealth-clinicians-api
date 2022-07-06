import { Status } from '../interfaces/error.interface';

class CustomError extends Error {
  status: Status;
  constructor(message: string, status: Status) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default CustomError;
