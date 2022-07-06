import request, { Response } from 'supertest';
import app from '../app';
import { StatusCode } from '../enums';

describe('Errors Handlers', () => {
  console.log(process.env.DATABASE_URL);
  it('Not found error', async () => {
    const response: Response = await request(app)
      .get("/api/v1/thisPageDoesn'tFound")
      .expect(StatusCode.ClientErrorNotFound);
    expect(response.body).toStrictEqual({
      message: 'Sorry, this page not found',
    });
  });
});
