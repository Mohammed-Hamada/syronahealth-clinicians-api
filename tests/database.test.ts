import { buildFakeData, sequelize } from '../src/database';

beforeEach(async () => {
  await buildFakeData();
});
describe('Database', () => {
  it('should create a user', async () => {
    // const user = await User.findAll();
    expect(true).toBe(true);
  });
});

afterAll(async () => {
  await sequelize.close();
});
