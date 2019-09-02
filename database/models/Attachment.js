const mongoose = require('mongoose');

const { ObjectId: ID } = mongoose;

const schema = new mongoose.Schema({
  id: ID,
  user: { type: ID, ref: 'User' },
  src: String,
  type: String,
  name: String,
});

module.exports = mongoose.model('Attachment', schema);
