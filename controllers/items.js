async function index(ctx) {
  ctx.body = await ctx.db.Item.find();
}

module.exports = {
  index,
};
