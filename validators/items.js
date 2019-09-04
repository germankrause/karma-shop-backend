const config = require('../config');
const validate = require('./validate');

async function create(ctx, next) {
  await validate(ctx.request.body, {
    attachments: {
      type: 'array',
      presence: true,
      array: {
        _id: {
          presence: true,
          owner: {
            Model: ctx.db.Attachment,
            user: ctx.user,
          },
        },
      },
    },
    'attachments.0': {
      presence: true,
    },
    price: {
      type: 'number',
      presence: true,
    },
    size: {
      type: 'integer',
      presence: true,
    },
    name: {
      type: 'string',
      length: {
        maximum: config.string,
      },
      presence: true,
    },
    description: {
      type: 'string',
      length: {
        maximum: config.longString,
      },
      presence: true,
    },
  },
  {
    cleanAttributes: false,
  });
  await next();
}

async function owner(ctx, next) {
  await validate(ctx.request.body, {
    _id: {
      presence: true,
      owner: {
        Model: ctx.db.Item,
        user: ctx.user,
      },
    },
  });
  await next();
}

module.exports = {
  create,
  owner,
};
