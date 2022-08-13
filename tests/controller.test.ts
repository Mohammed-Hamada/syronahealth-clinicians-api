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
  it('Get company by id from database | <Company is exists>', async () => {
    const response: Response = await request(app).get('/api/v1/companies/2');
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('id', 2);
    expect(response.body.data.name).toEqual('Wordpedia');
  });
  it('Get company by id from database | <Company is not exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/100')
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('There is no company with id 100');
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
        percentage: 16,
        label: 'Added A Note',
      },
      {
        percentage: 15,
        label: 'Commented On A Blog',
      },
      {
        percentage: 11,
        label: 'Completed A Module',
      },
      {
        percentage: 56,
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

describe('UsersInterest Controllers', () => {
  it('Get company interests for all employees: <Company is exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/1/users-interests')
      .expect(StatusCodes.OK);

    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 1);
    expect(response.body.data.company.totalInterests).toBeInstanceOf(Array);
    expect(response.body.data.company.totalInterests).toStrictEqual([
      {
        percentage: 10,
        label: 'Pregnancy',
      },
      {
        percentage: 8,
        label: 'Wellbeing',
      },
      {
        percentage: 8,
        label: 'Sexual Health',
      },
      {
        percentage: 74,
        label: 'Others',
      },
    ]);
  });
  it('Get company interests for all employees: <Company is not exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/11/users-interests')
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('There is no company with id 11');
  });
  it('Get company interests for all employees: <Company is exists | No users interests>', async () => {
    const response: Response = await request(app)

      .get('/api/v1/companies/8/users-interests')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 8);
    expect(response.body.data.company.totalInterests).toBeInstanceOf(Array);
    expect(response.body.data.company.totalInterests).toStrictEqual([]);
  });
});

afterAll(async () => {
  await sequelize.close();
});
