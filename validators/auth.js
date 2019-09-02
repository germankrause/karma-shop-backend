const validate = require('./validate');

async function register({ request }, next) {
  await validate(request.body, {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        maximum: 60,
      },
    },
  });
  await next();
}

module.exports = { register };

/**

  firstName: String,
  lastName: String,
  password: String,
  phone: String,

 */
