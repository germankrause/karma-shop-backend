const { ctxWithParams } = require('../helpers');

async function create({
  request, user, response, db,
}) {
  const users = {
    user: request.body.userId,
    fromUser: user,
  };
  const data = {
    text: request.body.text,
    rating: request.body.rating,
  };
  let feedback = await db.Feedback.findOne(users);
  if (feedback) {
    feedback = await db.Feedback.findByIdAndUpdate(feedback.id, data, { new: true });
  } else {
    feedback = await db.Feedback.create({ ...users, ...data });
  }
  await feedback
    .populate('user')
    .populate('fromUser')
    .execPopulate();
  response.body = feedback.toJSON();
}

async function remove(...args) {
  const { ctx, params } = ctxWithParams(...args);
  const { db, user, response } = ctx;
  const feedback = await db.Feedback.findOne({
    _id: params[0],
    fromUser: user,
  });
  if (!feedback) return ctx.throw(404, 'Feedback not found');
  await feedback.delete();
  response.body = feedback.toJSON();
}

module.exports = {
  create,
  remove,
};
