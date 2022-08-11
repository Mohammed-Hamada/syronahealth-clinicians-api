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
    const response: Response = await request(app)
      .get('/api/v1/companies')
      .expect(StatusCodes.OK);
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

describe('UsersEngagements Controllers', () => {
  it('Get company engagements for all employees: <Company is exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/1/users-engagements')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 1);
    expect(response.body.data.company.totalEngagements).toBeInstanceOf(Array);
    expect(response.body.data.company.totalEngagements).toStrictEqual([
      {
        counter: 16,
        label: 'Added A Note',
      },
      {
        counter: 15,
        label: 'Commented On A Blog',
      },
      {
        counter: 11,
        label: 'Completed A Module',
      },
      {
        counter: 56,
        label: 'Others',
      },
    ]);
  });
  it('Get company engagements for all employees: <Company is not exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/11/users-engagements')
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('There is no company with id 11');
  });
  it('Get company engagements for all employees: <Company is exists | No users engagements>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/8/users-engagements')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 8);
    expect(response.body.data.company.totalEngagements).toBeInstanceOf(Array);
    expect(response.body.data.company.totalEngagements).toStrictEqual([]);
  });
});

afterAll(async () => {
  await sequelize.close();
});
