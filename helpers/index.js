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

module.exports = {
  requireFolder,
};
