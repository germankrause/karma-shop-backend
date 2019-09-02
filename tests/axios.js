require('dotenv').config();
const axios = require('axios');

const { PORT, HOST } = process.env;
axios.defaults.baseURL = `http://${HOST}:${PORT}/`;

module.exports = axios;
