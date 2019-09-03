const route = require('koa-route');
const controllers = require('../controllers');
const validators = require('../validators');
const middlewares = require('../middlewares/local');

module.exports = function router(app) {
  function setRoute(name, handlers = []) {
    const [method = 'get', routeName = '/'] = name.split(' ');
    for (const handler of handlers) {
      app.use(route[method](routeName, handler));
    }
  }
  setRoute('post /auth/register', [validators.auth.register, controllers.auth.register]);
  setRoute('post /auth/login', [validators.auth.login, controllers.auth.login]);
  setRoute('get /auth/profile', [middlewares.auth, controllers.auth.getProfile]);
};
