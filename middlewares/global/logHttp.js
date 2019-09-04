const logger = require('../../logger');

async function logHttp({ request, response }, next) {
  const requestData = {
    route: `${request.method} ${request.path}`,
    query: request.query,
    body: request.body,
    headers: request.headers,
  };
  await next();
  const responseData = {
    status: response.status,
    body: response.body,
  };
  logger.log('Request', requestData);
  logger.log('Response', responseData);
}

module.exports = logHttp;
