import validateUser from '../src/helpers/validation';
import users from '../src/samples';

describe('Test user schema', () => {
  it('Add new user validation: Case: correct', async () => {
    await expect(
      validateUser({
        type: 'add',
        ...users[0],
      }),
    ).resolves.toMatchObject({
      type: 'add',
      username: 'Darline Bresnahan',
      first_name: 'Darline',
      last_name: 'Bresnahan',
      email: 'dbresnahan0@dyndns.org',
      is_deleted: true,
    });
  });
  it('Add new user validation: Case: username is required', async () => {
    await expect(
      validateUser({
        type: 'add',
        ...users[0],
      }),
    ).rejects.toEqual(
      expect.objectContaining({
        name: 'ValidationError',
        message: '"username" is required',
      }),
    );
  });
  it('Add new user validation: Case: username is required', async () => {
    await expect(
      validateUser({
        type: 'add',
        first_name: 'test',
        last_name: 'last',
        email: 'test@gmail.com',
      }),
    ).rejects.toEqual(
      expect.objectContaining({
        name: 'ValidationError',
        message: '"username" is required',
      }),
    );
  });
});
