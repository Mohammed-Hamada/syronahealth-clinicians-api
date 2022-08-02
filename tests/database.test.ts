import { buildDatabase, sequelize } from '../src/database';

beforeAll(async () => {
  await buildDatabase();
});

describe('Database', () => {
  it('should be able to connect to the database', async () => {
    await sequelize.authenticate();
  });
});

afterAll(async () => {
  await sequelize.close();
});
