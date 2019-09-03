const logger = require('../../logger');

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    switch (error.name) {
      case 'ValidationError':
        ctx.status = 400;
        ctx.message = error.name;
        ctx.body = error.fields;
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
        logger.error(error);
        break;
    }
  }
}

module.exports = errorHandler;
