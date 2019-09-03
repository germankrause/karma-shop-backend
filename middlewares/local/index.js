const path = require('path');
const filesParser = require('koa-body')({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../../tmp'),
    keepExtensions: true,
  },
});

async function auth(ctx, next) {
  if (!ctx.user) {
    ctx.throw(401);
  }
  await next();
}

module.exports = {
  auth,
  filesParser,
};
