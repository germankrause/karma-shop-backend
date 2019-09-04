const { createUser, sendFile } = require('./common');

describe('Attachments', () => {
  const route = 'attachments';

  let user;
  test('Create user', async () => {
    user = await createUser();
  });

  describe('Create', () => {
    test('Success', async () => {
      expect.assertions(1);
      try {
        const response = await sendFile(`${__dirname}/files/image.jpg`, route, user);
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
        await sendFile(`${__dirname}/files/test.txt`, route, user);
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
