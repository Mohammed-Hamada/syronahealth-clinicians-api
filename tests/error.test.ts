import request, { Response } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import ErrorsMessages from '../src/enums';
import app from '../src/app';

describe('Errors Handlers', () => {
  it('Not found error', async () => {
    const response: Response = await request(app)
      .get('/api/v1/not-found')
      .expect(StatusCodes.NOT_FOUND);
    expect(response.body).toStrictEqual({
      message: ErrorsMessages.NOT_FOUND,
    });
  });
});
