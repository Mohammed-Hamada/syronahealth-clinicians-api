import request, { Response } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { SuccessMessages } from '../src/enums';
import app from '../src/app';
import { buildDatabase, sequelize } from '../src/database';

beforeAll(async () => {
  await buildDatabase();
});

describe('POST | Companies Controller', () => {
  it('Add new company to database', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 100,
        subscriptionType: '2',
        email: 'a@gmail.com, b@gmail.com',
      })
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
  });
  it('Add new company to database: <False subscription type>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        subscriptionType: '3',
        email: 'c@gmail.com, d@gmail.com',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(
      '"subscriptionType" must be one of [1, 2]',
    );
  });
  it('Add new company to database: <Empty email address>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        email: '',
        subscriptionType: '1',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('"emails" is not allowed to be empty');
  });
  it('Add new company to database: <Space email address>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        email: ' ',
        subscriptionType: '1',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('Invalid emails');
  });
  it('Add new company to database: <undefined email address>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        subscriptionType: '1',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('No email found');
  });
});

afterAll(async () => {
  await sequelize.close();
});
