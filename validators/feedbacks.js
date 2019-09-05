const config = require('../config');
const validate = require('./validate');

async function create(ctx, next) {
  await validate(ctx.request.body, {
    userId: {
      presence: true,
      exists: {
        Model: ctx.db.User,
        field: '_id',
      },
    },
    rating: {
      presence: true,
      type: 'integer',
      numericality: {
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 5,
      },
    },
    text: {
      presence: true,
      type: 'string',
      length: {
        maximum: config.string,
      },
    },
  });
  await next();
}


module.exports = {
  create,
};
