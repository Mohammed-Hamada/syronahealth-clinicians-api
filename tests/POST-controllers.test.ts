import request, { Response } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { SuccessMessages } from '../src/enums';
import app from '../src/app';
import { buildFakeData, sequelize } from '../src/database';

beforeAll(async () => {
  await buildFakeData();
});

describe('POST | Companies Controller', () => {
  it('Add new company to database', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        uniqueCode: 'Q2W1pS',
        subscriptionType: '2',
      })
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
  });
  it('Add new company to database: <Duplicated unique code>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        uniqueCode: 'Q2W1pS',
        subscriptionType: '2',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('unique code is already in use');
  });
  it('Add new company to database: <False subscription type>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        uniqueCode: 'BdSd11',
        subscriptionType: '3',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(
      '"subscriptionType" must be one of [1, 2]',
    );
  });
  it('Add new company to database: <Unique code is less than 6 characters>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        uniqueCode: 'Fd2S451',
        subscriptionType: '2',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(
      'Unique code must be 6 characters',
    );
  });
  it('Add new company to database: <False subscription type>', async () => {
    const response: Response = await request(app)
      .post('/api/v1/companies')
      .send({
        allowedEmployees: 100,
        name: 'Test Company',
        coins: 111,
        uniqueCode: 'LoSW',
        subscriptionType: '1',
      })
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(
      'Unique code must be 6 characters',
    );
  });
});

afterAll(async () => {
  await sequelize.close();
});
