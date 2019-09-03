async function register({ request, response, db }) {
  const user = await db.User.create(request.body);
  response.body = user.toJSON();
}

module.exports = {
  register,
};
