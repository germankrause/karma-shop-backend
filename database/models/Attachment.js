const mongoose = require('mongoose');

const { ObjectId: ID } = mongoose;

const schema = new mongoose.Schema({
  id: ID,
  src: String,
  user: { type: ID, ref: 'User' },
  type: String,
  name: String,
});

module.exports = mongoose.model('Attachment', schema);
