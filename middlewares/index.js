const koaBodyParser = require('koa-bodyparser');
const logHttp = require('./global/logHttp');
const errorHandler = require('./global/errorHandler');

function setGlobalMiddlewares(app) {
  app.use(errorHandler);
  app.use(koaBodyParser());
  app.use(logHttp);
}

module.exports = setGlobalMiddlewares;
