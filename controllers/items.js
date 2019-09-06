const { ctxWithParams } = require('../helpers');

async function create({
  request, user, response, db,
}) {
  const item = await db.Item.create({
    ...request.body,
    user,
    views: 0,
  });
  await item.populate('attachments').execPopulate();
  response.body = item.toJSON();
}

async function index({ request, response, db }) {
  const total = await db.Item.countDocuments({ buyer: null });
  const page = +request.query.page || 0;
  const perPage = +request.query.perPage || 20;
  const items = await db.Item.find({ buyer: null })
    .limit(perPage)
    .skip(page * perPage)
    .populate('user')
    .populate('attachments');
  response.body = {
    pagination: {
      total,
      perPage,
      page,
    },
    items: items.map(item => item.toJSON()),
  };
}

async function edit({ request, response, db }) {
  const item = await db.Item.findByIdAndUpdate(request.body._id, request.body, { new: true });
  await item
    .populate('user')
    .populate('attachments')
    .execPopulate();
  response.body = item.toJSON();
}

async function show({ response, db }, id) {
  const item = await db.Item.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true },
  );
  await item
    .populate('user')
    .populate('attachments')
    .execPopulate();
  response.body = item.toJSON();
}

async function remove(...args) {
  const { ctx, params } = ctxWithParams(...args);
  const { db, user, response } = ctx;
  const item = await db.Item.findOne({
    _id: params[0],
    user,
  });
  if (!item) return ctx.throw(404, 'Item not found');
  await item.delete();
  response.body = item.toJSON();
}

async function buy({
  request, response, user, db,
}) {
  const itemIds = request.body.items.map(item => item._id);
  await db.Item.updateMany({
    _id: { $in: itemIds },
  }, {
    buyer: user,
  });
  const items = await db.Item.find({ _id: { $in: itemIds } });
  response.body = items.map(item => item.toJSON());
}

module.exports = {
  create,
  index,
  edit,
  show,
  remove,
  buy,
};
