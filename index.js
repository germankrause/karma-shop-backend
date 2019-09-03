require('dotenv').config();
const { db, models } = require('./database');
const Koa = require('koa');
const setGlobalMiddlewares = require('./middlewares');
const router = require('./router');
const config = require('./config');

db.once('open', () => {
  const app = new Koa();
  app.context.db = models;
  app.context.config = config;
  setGlobalMiddlewares(app);
  router(app);
  app.listen(3333);
});
