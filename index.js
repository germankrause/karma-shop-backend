require('dotenv').config();
const { db, models } = require('./database');
const Koa = require('koa');
const router = require('./router');

db.once('open', () => {
  const app = new Koa();
  app.context.db = models;
  router(app);
  app.listen(3333);
});
