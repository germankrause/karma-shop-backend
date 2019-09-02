/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

const allFiles = fs.readdirSync(__dirname);
const models = allFiles.map(file => file.replace(/.js$/, ''))
  .filter(file => file !== 'index');

const modules = {};
for (const model of models) {
  modules[model] = require(`./${model}`);
}

module.exports = modules;
