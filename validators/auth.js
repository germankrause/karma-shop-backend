const validate = require('./validate');

async function register(ctx, next) {
  await validate(ctx.request.body, {
    email: {
      presence: true,
      email: true,
      length: {
        maximum: ctx.config.string,
      },
      unique: {
        Model: ctx.db.User,
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        maximum: ctx.config.string,
      },
    },
    firstName: {
      presence: true,
      length: {
        maximum: ctx.config.string,
      },
    },
    lastName: {
      presence: true,
      length: {
        maximum: ctx.config.string,
      },
    },
    phone: {
      presence: true,
      length: {
        minimum: 10,
        maximum: 15,
      },
      unique: {
        Model: ctx.db.User,
      },
    },
  });
  await next();
}

module.exports = { register };
