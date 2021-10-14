const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  codename: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  contrib: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: ""
  },
  askedquestions: {
    type: Array,
    default: []
  }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const UserSchema = mongoose.model('user', userSchema);

module.exports = UserSchema;