const validateJS = require('validate.js');

async function validate(data, rules) {
  try {
    await validateJS.async(data, rules);
  } catch (fields) {
    const error = new Error();
    error.name = 'ValidationError';
    error.fields = fields;
    throw error;
  }
}

module.exports = validate;
