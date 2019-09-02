const mongoose = require('mongoose');
const Logger = require('../logger');
const models = require('./models');

const logger = new Logger(console);

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', logger.error);
db.once('open', () => {
  logger.log('DB connected');
});

module.exports = {
  db,
  models,
};
