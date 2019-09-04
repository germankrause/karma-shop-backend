const FormData = require('form-data');
const fs = require('fs');
const axios = require('./axios');
const { randomString } = require('../helpers');
const { createUser } = require('./common');

describe('Attachments', () => {
  const route = 'attachments';

  const sendFile = (path) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(path), {
      filename: `${randomString()}.jpg`,
    });
    return axios.post(route, form, {
      headers: form.getHeaders(),
    });
  };

  test('Create user', async () => {
    const { token } = await createUser();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  });

  describe('Create', () => {
    test('Success', async () => {
      expect.assertions(1);
      try {
        const response = await sendFile(`${__dirname}/files/image.jpg`);
        expect(response).toMatchObject({
          status: 200,
          data: {
            _id: expect.any(String),
            user: { _id: expect.any(String) },
            src: expect.any(String),
            type: expect.any(String),
            name: expect.any(String),
          },
        });
      } catch (error) {
        expect(error).toBe(null);
      }
    });

    test('Invalid type', async () => {
      expect.assertions(1);
      try {
        await sendFile(`${__dirname}/files/test.txt`);
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 400,
          data: {
            file: [expect.any(String)],
          },
        });
      }
    });
  });
});
