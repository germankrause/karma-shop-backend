async function auth(ctx, next) {
  const { authorization } = ctx.request.headers;
  if (authorization) {
    const [, token] = authorization.split(' ');
    ctx.user = await ctx.db.User.jwtVerify(token);
  }
  await next();
}

module.exports = auth;
