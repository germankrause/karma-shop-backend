const path = require('path');
const filesParser = require('koa-body')({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../../tmp'),
    keepExtensions: true,
  },
});

async function fileParser(ctx, next) {
  const nextReturnCtx = context => context;
  await filesParser(ctx, nextReturnCtx);
  const key = Reflect.ownKeys(ctx.request.files)[0];
  ctx.request.file = ctx.request.files[key];
  ctx.request.file.key = key;
  await next();
}

function fileTypes(types) {
  return async function fileTypesMiddleware(ctx, next) {
    for (const type of types) {
      if (ctx.request.file.type.includes(type)) return await next();
    }
    const message = `File have to be one of types: ${types.join(', ')}`;
    ctx.validationError(ctx.request.file.key, message);
  };
}

async function auth(ctx, next) {
  if (!ctx.user) {
    ctx.throw(401);
  }
  await next();
}

module.exports = {
  auth,
  fileParser,
  fileTypes,
};
