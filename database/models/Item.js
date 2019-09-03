const mongoose = require('mongoose');

const { ObjectId: ID } = mongoose;

const schema = new mongoose.Schema({
  user: { type: ID, ref: 'User' },
  attachments: [{ type: ID, ref: 'Attachment' }],
  price: Number,
  size: Number,
  name: String,
  description: String,
  views: Number,
});

module.exports = mongoose.model('Item', schema);
