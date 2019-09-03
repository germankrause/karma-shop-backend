const axios = require('./axios');
const { randomString, randomDigits } = require('../helpers');

describe('Authentication', () => {
  const prefix = 'auth';

  const email = `${randomString()}@mail.com`;
  const password = randomString();
  describe('Registration', () => {
    const route = `${prefix}/register`;

    test('Validation', async () => {
      expect.assertions(1);
      try {
        await axios.post(route);
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 400,
          data: {
            email: [expect.any(String)],
            firstName: [expect.any(String)],
            lastName: [expect.any(String)],
            password: [expect.any(String)],
            phone: [expect.any(String), expect.any(String)],
          },
        });
      }
    });

    test('Success', async () => {
      expect.assertions(2);
      let response;
      try {
        response = await axios.post(route, {
          email,
          firstName: randomString(),
          lastName: randomString(),
          password,
          phone: randomDigits(12),
        });
      } catch (error) {
        expect(error).toBe(null);
      }
      expect(response).toMatchObject({
        status: 200,
        data: {
          _id: expect.any(String),
          email: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          phone: expect.any(String),
          // token: expect.any(String),
        },
      });
      expect(response.data.password).toBeUndefined();
    });

    test('Unique email validation', async () => {
      expect.assertions(2);
      try {
        await axios.post(route, {
          email,
          firstName: randomString(),
          lastName: randomString(),
          password: randomString(),
          phone: randomDigits(12),
        });
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 400,
          data: {
            email: [expect.any(String)],
          },
        });
        expect(response.data.email[0]).toBe('This email is already taken');
      }
    });
  });
});
