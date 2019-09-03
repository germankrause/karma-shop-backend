const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const util = require('util');

const hash = util.promisify(bcrypt.hash);
const compare = util.promisify(bcrypt.compare);

const { ObjectId: ID } = mongoose;

const schema = new mongoose.Schema({
  items: [{ type: ID, ref: 'Item' }],
  feedbacks: [{ type: ID, ref: 'Feedback' }],
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
});

schema.pre('save', async function beforeSave(next) {
  if (this.password && this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  await next();
});

schema.methods.comparePassword = async function comparePassword(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

schema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


module.exports = mongoose.model('User', schema);
