const logger = require('../../logger');

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    const validationHandle = ({ response }) => {
      response.status = 400;
      response.message = error.name;
      response.body = error.fields;
    };
    switch (error.name) {
      case 'ValidationError':
        validationHandle(ctx);
        break;
      case 'BadRequestError':
        if (error.message === 'ValidationError') {
          validationHandle(ctx);
        }
        break;
      case 'JsonWebTokenError':
        ctx.status = 401;
        ctx.body = 'Invalid token';
        break;
      case 'UnauthorizedError':
        ctx.status = 401;
        ctx.body = 'Unauthorized';
        break;
      default:
        if (!error.status || error.status >= 500) {
          logger.error(error);
        }
        break;
    }
  }
}

module.exports = errorHandler;
