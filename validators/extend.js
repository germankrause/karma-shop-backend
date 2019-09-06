const validateJS = require('validate.js');

async function unique(value, { Model }, field) {
  const data = {};
  data[field] = value;
  const exist = await Model.find(data);
  if (!exist.length) return;
  return `^This ${field} is already taken`;
}

async function exists(value, { Model, field, where = {} }, ...args) {
  if (!field) field = args[0];
  const data = { ...where };
  data[field] = value;
  const exist = await Model.find(data);
  if (exist.length) return;
  return `^${Model.modelName} with this ${field} was not found`;
}

async function owner(value, { Model, user }, field) {
  field = field.split('.').pop();
  const data = { user };
  data[field] = value;
  const exist = await Model.find(data);
  if (exist.length) return;
  return `^You aren't owner of this ${Model.modelName.toLowerCase()}`;
}

async function array(values, rules) {
  const promises = [];
  if (!values) return 'must be an array';
  for (const value of values) {
    const promise = validateJS.async(value, rules);
    promises.push(promise);
  }
  await Promise.all(promises);
}

module.exports = {
  unique,
  exists,
  owner,
  array,
};
