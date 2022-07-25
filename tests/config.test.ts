import { databaseVars, serverVars } from '../src/config';

describe('Test Database Config file', () => {
  it('Test database url and node env', () => {
    process.env.NODE_ENV = 'test';
    expect(databaseVars).toMatchObject({
      NODE_ENV: 'test',
      DATABASE_URL: databaseVars.DATABASE_URL,
    });
  });
});
describe('Test Server Config file', () => {
  it('Test server port and node env', () => {
    process.env.NODE_ENV = 'test';
    expect(serverVars).toMatchObject({
      NODE_ENV: 'test',
      PORT: '3000',
    });
  });
});
