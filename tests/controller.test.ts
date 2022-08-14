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
        percentage: 16.411378555798688,
        label: 'Added A Note',
      },
      {
        percentage: 15.317286652078774,
        label: 'Commented On A Blog',
      },
      {
        percentage: 11.37855579868709,
        label: 'Booked Consultation',
      },
      {
        percentage: 56.892778993435456,
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
        percentage: 10.256410256410255,
        label: 'Pregnancy',
      },
      {
        percentage: 7.6923076923076925,
        label: 'Wellbeing',
      },
      {
        percentage: 7.6923076923076925,
        label: 'Sexual Health',
      },
      {
        percentage: 74.35897435897435,
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
        count: 25,
        label: 'Female',
      },
      {
        count: 41,
        label: 'Male',
      },
      {
        count: 2,
        label: 'Transfemale',
      },
      {
        count: 0,
        label: 'Transmale',
      },
      {
        count: 2,
        label: 'None Or Agender',
      },
      {
        count: 8,
        label: 'Others',
      },
      {
        count: 2,
        label: 'Prefer Not To Say',
      },
    ]);
    expect(response.body.data.company.employeesCount).toStrictEqual(80);
  });
  it('Get company genders for all employees: <Company is not exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/11/employees-gender')
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('There is no company with id 11');
  });
  it('Get company genders for all employees: <Company is exists | No employees>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/8/employees-gender')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 8);
    expect(response.body.data.company.employeesGender).toBeInstanceOf(Array);
    expect(response.body.data.company.employeesGender).toStrictEqual([]);
    expect(response.body.data.company.employeesCount).toStrictEqual(0);
  });
});

describe('UserHealthConditions Controller', () => {
  it('Get company health conditions for all employees: <Company is exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/1/users-health-conditions')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 1);
    expect(response.body.data.company.topThreeHealthConditions).toBeInstanceOf(
      Array,
    );
    expect(response.body.data.company.topThreeHealthConditions).toStrictEqual([
      {
        percentage: 19.047619047619047,
        label: 'Hair Loss',
      },
      {
        percentage: 14.285714285714285,
        label: 'Stress',
      },
      {
        percentage: 14.285714285714285,
        label: 'Depression',
      },
    ]);
    expect(response.body.data.company.allHealthConditions).toStrictEqual([
      {
        percentage: 19.047619047619047,
        label: 'Hair Loss',
      },
      {
        percentage: 14.285714285714285,
        label: 'Stress',
      },
      {
        percentage: 14.285714285714285,
        label: 'Depression',
      },
      {
        percentage: 9.523809523809524,
        label: 'High Blood Pressure',
      },
      {
        percentage: 9.523809523809524,
        label: 'High Cholesterol',
      },
      {
        percentage: 9.523809523809524,
        label: "Alzheimer's Disease",
      },
      {
        percentage: 4.761904761904762,
        label: 'Leukemia',
      },
      {
        percentage: 4.761904761904762,
        label: 'Heart Disease',
      },
      {
        percentage: 4.761904761904762,
        label: 'Infertility',
      },
      {
        percentage: 4.761904761904762,
        label: 'Chronic Obstructive Pulmonary Disease (copd)',
      },
      {
        percentage: 4.761904761904762,
        label: 'Endo',
      },
    ]);
  });
  it('Get company health conditions for all employees: <Company is not exists>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/11/users-health-conditions')
      .expect(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('There is no company with id 11');
  });
  it('Get company health conditions for all employees: <Company is exists | No employees>', async () => {
    const response: Response = await request(app)
      .get('/api/v1/companies/8/users-health-conditions')
      .expect(StatusCodes.OK);
    expect(response.body.message).toBe(SuccessMessages.SUCCESS);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('company');
    expect(response.body.data.company).toHaveProperty('id', 8);
    expect(response.body.data.company.totalHealthConditions).toBeInstanceOf(
      Array,
    );
    expect(response.body.data.company.totalHealthConditions).toStrictEqual([]);
  });
});
afterAll(async () => {
  await sequelize.close();
});
