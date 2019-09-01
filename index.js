const db = require('./database');
const Koa = require('koa');
const router = require('./router');

const app = new Koa();
app.context.db = db;
router(app);
app.listen(3333);
