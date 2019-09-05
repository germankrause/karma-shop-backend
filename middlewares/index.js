const koaBodyParser = require('koa-bodyparser');
const cors = require('./global/cors');
const logHttp = require('./global/logHttp');
const errorHandler = require('./global/errorHandler');
const auth = require('./global/auth');

function setGlobalMiddlewares(app) {
  app.use(cors);
  app.use(koaBodyParser());
  app.use(logHttp);
  app.use(errorHandler);
  app.use(auth);
}

module.exports = setGlobalMiddlewares;
