const mongoose = require('mongoose');
const logger = require('../logger');
const models = require('./models');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', logger.error);
db.once('open', () => {
  logger.log('DB connected');
});

module.exports = {
  db,
  models,
};
