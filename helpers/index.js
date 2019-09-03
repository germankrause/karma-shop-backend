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

const randomString = (length = 10) => {
  let string = '';
  while (string.length < length) {
    string += Math.random().toString(36).substr(2, 10);
  }
  return string.substr(0, length);
};

const randomDigits = (length) => {
  let string = '';
  while (string.length < length) {
    string += Math.random().toString().substr(2, 10);
  }
  return string.substr(0, length);
};

module.exports = {
  requireFolder,
  randomString,
  randomDigits,
};
