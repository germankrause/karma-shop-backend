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

async function index({ user, response, db }) {
  const items = await db.Item.find({
    user,
  }).populate('user')
    .populate('attachments');
  response.body = items.map(item => item.toJSON());
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

module.exports = {
  create,
  index,
  edit,
  show,
};
