const axios = require('./axios');
const { randomString, randomDigits } = require('../helpers');

const randomEmail = () => `${randomString()}@mail.com`;

const createUser = async () => {
  const response = await axios.post('auth/register', {
    email: randomEmail(),
    firstName: randomString(),
    lastName: randomString(),
    password: 'test1234',
    phone: randomDigits(12),
  });
  return response.data;
};

module.exports = {
  randomEmail,
  createUser,
};
