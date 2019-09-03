async function register({ request, response, db }) {
  const user = await db.User.create(request.body);
  response.body = user.toJSON();
  response.body.token = await user.jwtSign();
}

async function login({ request, response, db }) {
  const user = await db.User.findOne({
    email: request.body.email,
  });
  if (await user.comparePassword(request.body.password)) {
    response.body = user.toJSON();
    response.body.token = await user.jwtSign();
  } else {
    response.status = 400;
    response.body = {
      password: ['Password is invalid'],
    };
  }
}

module.exports = {
  register,
  login,
};
