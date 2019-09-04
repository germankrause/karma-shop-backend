const FormData = require('form-data');
const fs = require('fs');
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

const sendFile = (path, route = 'attachments', { token }) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(path), {
    filename: `${randomString()}.jpg`,
  });
  return axios.post(route, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${token}`,
    },
  });
};

const createAttachment = async (user) => {
  if (!user) {
    user = await createUser();
  }
  const response = await sendFile(`${__dirname}/files/image.jpg`, null, user);
  return response.data;
};

module.exports = {
  randomEmail,
  createUser,
  sendFile,
  createAttachment,
};
