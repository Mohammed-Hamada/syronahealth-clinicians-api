import request, { Response } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { SuccessMessages } from '../src/enums';
import app from '../src/app';
import { buildFakeData, sequelize } from '../src/database';

beforeEach(async () => {
  await buildFakeData();
});

describe('Companies Controller', () => {
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

describe('UsersEngagements Controller', () => {
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
  it('Get company engagements for all employees: <Company is exists | No employees>', async () => {
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

describe('UsersInterests Controller', () => {
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
  it('Get company interests for all employees: <Company is exists | No employees>', async () => {
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

describe('UsersGenders Controller', () => {
  it('Get company genders for all employees: <Company is exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/1/employees-gender')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 1);
    expect(response.body.data.company.employeesGender).toBeInstanceOf(Array);
    expect(response.body.data.company.employeesGender).toStrictEqual([
      {
        count: 10,
        label: 'Others',
      },
      {
        count: 51,
        label: 'Male',
      },
      {
        count: 3,
        label: 'Transfemale',
      },
      {
        count: 31,
        label: 'Female',
      },
      {
        count: 3,
        label: 'Prefer Not To Say',
      },
      {
        count: 3,
        label: 'None Or Agender',
      },
      {
        count: 0,
        label: 'Transmale',
      },
    ]);
  });
  it('Get company genders for all employees: <Company is not exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/11/employees-gender')
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('There is no company with id 11');
  });
  it('Get company interests for all employees: <Company is exists | No employees>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/8/employees-gender')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 8);
    expect(response.body.data.company.employeesGender).toBeInstanceOf(Array);
    expect(response.body.data.company.employeesGender).toStrictEqual([]);
  });
});

afterAll(async () => {
  await sequelize.close();
});
