const mongoose = require('mongoose');

const { ObjectId: ID } = mongoose;

const schema = new mongoose.Schema({
  id: ID,
  items: [{ type: ID, ref: 'Item' }],
  feedbacks: [{ type: ID, ref: 'Feedback' }],
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
});

module.exports = mongoose.model('User', schema);
