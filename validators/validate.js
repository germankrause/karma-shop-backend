const validateJS = require('validate.js');
const extend = require('./extend');

for (const method of Reflect.ownKeys(extend)) {
  validateJS.validators[method] = extend[method];
}

async function validate(...args) {
  try {
    await validateJS.async(...args);
  } catch (fields) {
    const error = new Error();
    error.name = 'ValidationError';
    error.fields = fields;
    throw error;
  }
}

module.exports = validate;
