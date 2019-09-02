const route = require('koa-route');
const controllers = require('../controllers');
const validators = require('../validators');

module.exports = function router(app) {
  function setRoute(name, handlers = []) {
    const [method = 'get', routeName = '/'] = name.split(' ');
    for (const handler of handlers) {
      app.use(route[method](routeName, handler));
    }
  }
  setRoute('get /items', [validators.test.test, controllers.items.index]);
};
