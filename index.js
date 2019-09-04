require('dotenv').config();
const { db, models } = require('./database');
const Koa = require('koa');
const setGlobalMiddlewares = require('./middlewares');
const router = require('./router');
const config = require('./config');
const { validationError } = require('./helpers');

db.once('open', () => {
  const app = new Koa();
  app.context.db = models;
  app.context.config = config;
  app.context.validationError = validationError;
  setGlobalMiddlewares(app);
  router(app);
  app.listen(3333);
});
