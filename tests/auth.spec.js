const axios = require('./axios');
const { randomString, randomDigits } = require('../helpers');

const randomEmail = () => `${randomString()}@mail.com`;

describe('Authentication', () => {
  const prefix = 'auth';

  const email = randomEmail();
  const password = randomString();
  let token;

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
          token: expect.any(String),
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

  describe('Login', () => {
    const route = `${prefix}/login`;

    test('Success', async () => {
      expect.assertions(2);
      try {
        const response = await axios.post(route, {
          email,
          password,
        });
        expect(response).toMatchObject({
          status: 200,
          data: {
            _id: expect.any(String),
            email: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            phone: expect.any(String),
            token: expect.any(String),
          },
        });
        expect(response.data.token).toBeDefined();
        token = response.data.token;
      } catch (error) {
        expect(error).toBe(null);
      }
    });

    test('Wrong email', async () => {
      expect.assertions(1);
      try {
        await axios.post(route, {
          email: randomEmail(),
          password: randomString(10),
        });
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 400,
          data: {
            email: [expect.any(String)],
          },
        });
      }
    });

    test('Wrong password', async () => {
      expect.assertions(1);
      try {
        await axios.post(route, {
          email,
          password: randomString(10),
        });
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 400,
          data: {
            password: [expect.any(String)],
          },
        });
      }
    });
  });

  describe('Profile', () => {
    const route = `${prefix}/profile`;

    test('Success retrieve', async () => {
      expect.assertions(1);
      try {
        const response = await axios.get(route, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        expect(response).toMatchObject({
          status: 200,
          data: {
            _id: expect.any(String),
            email: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            phone: expect.any(String),
          },
        });
      } catch (error) {
        expect(error).toBe(null);
      }
    });

    test('Invalid token', async () => {
      expect.assertions(1);
      try {
        await axios.get(route, {
          headers: {
            Authorization: `Bearer ${token}s`,
          },
        });
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 401,
          data: 'Invalid token',
        });
      }
    });

    test('Get without token', async () => {
      expect.assertions(1);
      try {
        await axios.get(route);
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 401,
          data: 'Unauthorized',
        });
      }
    });
  });
});
