const validator = require('validator');

async function test({ request }, next) {
  console.log(validator, request);
  await next();
}

module.exports = { test };
