import request, { Response } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { SuccessMessages } from '../src/enums';
import app from '../src/app';
import { buildFakeData, sequelize } from '../src/database';

beforeEach(async () => {
  await buildFakeData();
});

describe('Company Controllers', () => {
  it('Get all companies from database', async () => {
    const response: Response = await request(app).get('/api/v1/companies');
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveLength(10);
    expect(response.body.data[0]).toHaveProperty('id', 1);
  });
  it('Get company by id from database', async () => {
    const response: Response = await request(app).get('/api/v1/companies/2');
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('id', 2);
    expect(response.body.data.name).toEqual('Wordpedia');
  });
});

afterAll(async () => {
  await sequelize.close();
});
