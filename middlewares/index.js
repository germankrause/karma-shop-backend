const koaBodyParser = require('koa-bodyparser');
const logHttp = require('./global/logHttp');
const errorHandler = require('./global/errorHandler');

function setGlobalMiddlewares(app) {
  app.use(koaBodyParser());
  app.use(logHttp);
  app.use(errorHandler);
}

module.exports = setGlobalMiddlewares;
