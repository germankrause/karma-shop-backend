const mongoose = require('mongoose');

const { ObjectId: ID } = mongoose;

const schema = new mongoose.Schema({
  id: ID,
  user: { type: ID, ref: 'User' },
  fromUser: { type: ID, ref: 'User' },
  text: String,
  rating: Number,
});

module.exports = mongoose.model('Feedback', schema);
