const s3 = require('../services/s3');

async function create({
  request, response, db, user,
}) {
  const file = request.files[request.file.key];
  const name = file.name;
  const type = name.split('.').pop();
  const { Location: src } = await s3.upload(file.path);
  const attachment = await db.Attachment.create({
    user,
    src,
    type,
    name,
  });
  response.body = attachment.toJSON();
}

module.exports = {
  create,
};
