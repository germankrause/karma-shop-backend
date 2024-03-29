/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

function requireFolder(path) {
  const allFiles = fs.readdirSync(path);
  const filesToRequire = allFiles.map(file => file.replace(/.js$/, ''))
    .filter(file => file !== 'index');

  const modules = {};
  for (const file of filesToRequire) {
    modules[file] = require(`${path}/${file}`);
  }
  return modules;
}

const random = (from, to) => Math.floor(Math.random() * to) + from;

const randomString = (length = 10) => {
  let string = '';
  while (string.length < length) {
    string += Math.random().toString(36).substr(2, 10);
  }
  return string.substr(0, length);
};

const randomDigits = (length = 10) => {
  let string = '';
  while (string.length < length) {
    string += Math.random().toString().substr(2, 10);
  }
  return string.substr(0, length);
};

function validationError(key, message) {
  const response = { fields: {} };
  response.fields[key] = [message];
  this.throw(400, 'ValidationError', response);
}

function ctxWithParams(ctx, ...args) {
  const next = args.pop();
  return {
    ctx,
    next,
    params: args,
  };
}

module.exports = {
  requireFolder,
  random,
  randomString,
  randomDigits,
  validationError,
  ctxWithParams,
};
