const axios = require('./axios');
const { randomString } = require('../helpers');

// describe('Authentication', () => {
//   const prefix = 'auth';
//   describe('Registration', () => {
//     const route = `${prefix}/register`;
//     test('Success', async () => {
//       try {
//         await axios.post(route, {
//           test: 1,
//         });
//       } catch ({ response }) {
//         expect(response).toMatchObject({
//           status: 404,
//         });
//       }
//     });
//   });
// });

describe('Error handling', () => {
  describe('Not found', () => {
    test('Response with status 404', async () => {
      try {
        await axios.get(randomString());
      } catch ({ response }) {
        expect(response).toMatchObject({
          status: 404,
        });
      }
    });
  });
});
