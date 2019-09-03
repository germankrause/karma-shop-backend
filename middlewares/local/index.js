async function auth(ctx, next) {
  if (!ctx.user) {
    ctx.throw(401);
  }
  await next();
}

module.exports = { auth };
