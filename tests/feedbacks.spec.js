const { createUser, createItem } = require('./common');
const { randomString, random } = require('../helpers');
const axios = require('./axios');

describe('Feedbacks', () => {
  const route = 'feedbacks';

  let user;
  let item;
  let feedback;
  test('Create user and item', async () => {
    user = await createUser();
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    item = await createItem();
  });

  describe('Create', () => {
    test('Success', async () => {
      expect.assertions(1);
      try {
        const response = await axios.post(route, {
          userId: item.user._id,
          text: randomString(),
          rating: random(1, 5),
        });
        expect(response).toMatchObject({
          status: 200,
          data: {
            user: {
              _id: item.user._id,
            },
            fromUser: {
              _id: user._id,
            },
            rating: expect.any(Number),
            text: expect.any(String),
          },
        });
        feedback = response.data;
      } catch (error) {
        expect(error).toBe(null);
      }
    });
    test('Create again: same id', async () => {
      expect.assertions(1);
      try {
        const response = await axios.post(route, {
          userId: item.user._id,
          text: randomString(),
          rating: random(1, 5),
        });
        expect(response.data._id).toBe(feedback._id);
      } catch (error) {
        expect(error).toBe(null);
      }
    });
    test('Empty data', async () => {
      expect.assertions(1);
      try {
        await axios.post(route);
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 400,
          data: {
            userId: [expect.any(String), expect.any(String)],
            text: [expect.any(String)],
            rating: [expect.any(String)],
          },
        });
      }
    });
  });

  describe('Delete', () => {
    test('Success', async () => {
      expect.assertions(2);
      try {
        const response = await axios.delete(`${route}/${feedback._id}`);
        expect(response.status).toBe(200);
        await axios.delete(`${route}/${feedback._id}`);
      } catch ({ response }) {
        expect(response.status).toBe(404);
      }
    });
  });
});
