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

  setRoute('post /attachments', [
    middlewares.auth,
    middlewares.fileParser,
    middlewares.fileTypes(['image']),
    controllers.attachments.create,
  ]);

  setRoute('post /items', [validators.items.create, controllers.items.create]);
  setRoute('get /items', [controllers.items.index]);
  setRoute('put /items', [validators.items.owner, validators.items.create, controllers.items.edit]);
  setRoute('get /items/:id', [controllers.items.show]);
  setRoute('delete /items/:id', [controllers.items.remove]);

  setRoute('post /feedbacks', [validators.feedbacks.create, controllers.feedbacks.create]);
  setRoute('delete /feedbacks/:id', [controllers.feedbacks.remove]);
};
