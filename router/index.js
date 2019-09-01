const route = require('koa-route');
const items = require('./items');

module.exports = function router(app) {
  app.use(route.get('/items', items.index));
};
