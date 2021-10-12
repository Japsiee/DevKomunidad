const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 1 * 24 * 60 * 60 })
}

module.exports.signupUser = (req,res) => {
  Users.create(req.body)
  .then(data => {
    const token = createToken(data._id);
    res.cookie('auth', token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
    res.json({ created: true, data: data });
  })
  .catch(err => {
    res.json({ created: false });
  })
}

module.exports.loginUser = async (req,res)  => {
  const { username, password } = req.body;
  const data = await Users.findOne({ username });

  if (data) {
    const result = await bcrypt.compare(password, data.password);
    if (result) {
      const token = createToken(data._id);
      res.cookie('auth', token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
      res.json({ authenticated: true, data: data });
    } else {
      res.json({ authenticated: false });  
    }
  } else {
    res.json({ message: "Not logged in" });
  }
}