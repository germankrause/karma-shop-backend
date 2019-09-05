const { createUser, createAttachment } = require('./common');
const { randomString, randomDigits } = require('../helpers');
const axios = require('./axios');


describe('Items', () => {
  const route = 'items';

  let user;
  let attachment;
  let item;
  test('Create user', async () => {
    user = await createUser();
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    attachment = await createAttachment(user);
  });

  describe('Create', () => {
    test('Success', async () => {
      expect.assertions(1);
      try {
        const response = await axios.post(route, {
          attachments: [attachment],
          price: 123,
          size: 42,
          name: randomString(),
          description: randomString(),
          randomShit: randomString(), // doesn't affect
        });
        expect(response).toMatchObject({
          status: 200,
          data: {
            attachments: [{
              _id: expect.any(String),
              src: expect.any(String),
              user: expect.any(String),
            }],
            user: {
              _id: expect.any(String),
            },
            price: expect.any(Number),
            size: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            views: 0,
          },
        });
        item = response.data;
      } catch (error) {
        expect(error).toBe(null);
      }
    });
    test('Empty array of attachments', async () => {
      expect.assertions(1);
      try {
        await axios.post(route, {
          attachments: [],
          price: 123,
          size: 42,
          name: randomString(),
          description: randomString(),
        });
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 400,
          data: {
            'attachments.0': [expect.any(String)],
          },
        });
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
            attachments: [expect.any(String), expect.any(String)],
            'attachments.0': [expect.any(String)],
            price: [expect.any(String)],
            size: [expect.any(String)],
            name: [expect.any(String)],
            description: [expect.any(String)],
          },
        });
      }
    });
  });

  describe('Index', () => {
    test('Success', async () => {
      expect.assertions(1);
      try {
        const response = await axios.get(route);
        expect(response).toMatchObject({
          status: 200,
          data: [{
            attachments: [{
              _id: expect.any(String),
              src: expect.any(String),
              user: expect.any(String),
            }],
            user: {
              _id: expect.any(String),
            },
            price: expect.any(Number),
            size: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            views: 0,
          }],
        });
      } catch (error) {
        expect(error).toBe(null);
      }
    });
  });

  describe('Update', () => {
    test('Success', async () => {
      expect.assertions(1);
      try {
        attachment = await createAttachment(user);
        delete attachment.user;
        const data = {
          _id: item._id,
          attachments: [attachment],
          price: +randomDigits(),
          size: +randomDigits(),
          name: randomString(),
          description: randomString(),
        };
        const response = await axios.put(route, data);
        expect(response).toMatchObject({
          status: 200,
          data,
        });
      } catch (error) {
        expect(error).toBe(null);
      }
    });
  });

  describe('Show', () => {
    test('Views increments', async () => {
      expect.assertions(2);
      try {
        const get = await axios.get(`${route}/${item._id}`);
        expect(get.data.views).toBe(1);
        const getAgain = await axios.get(`${route}/${item._id}`);
        expect(getAgain.data.views).toBe(2);
      } catch (error) {
        expect(error).toBe(null);
      }
    });
  });

  describe('Delete', () => {
    test('Success', async () => {
      expect.assertions(2);
      try {
        const response = await axios.delete(`${route}/${item._id}`);
        expect(response.status).toBe(200);
        await axios.delete(`${route}/${item._id}`);
      } catch ({ response }) {
        expect(response.status).toBe(404);
      }
    });
  });
});
