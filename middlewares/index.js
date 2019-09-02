const logHttp = require('./global/logHttp');

function setGlobalMiddlewares(app) {
  app.use(logHttp);
}

module.exports = setGlobalMiddlewares;
