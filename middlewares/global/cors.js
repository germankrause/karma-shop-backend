require('dotenv').config();
const cors = require('@koa/cors');

const options = {
  origin: process.env.APP_HOST,
};

module.exports = cors(options);
