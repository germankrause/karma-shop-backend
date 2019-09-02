const logger = require('../../logger');

async function logHttp({ request, response }, next) {
  const requestData = {
    route: `${request.method} ${request.path}`,
  };
  logger.log('Request', requestData);
  await next();
  const responseData = {
    status: response.status,
    body: response.body,
  };
  logger.log('Response', responseData);
}

module.exports = logHttp;
