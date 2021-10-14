const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const EMAILSENDER = process.env.EMAIL_SENDER;
const EMAILPASSWORD = process.env.EMAIL_PASSWORD;

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 1 * 24 * 60 * 60 })
}

module.exports.signupUser = (req,res) => {
  Users.create(req.body)
  .then(data => {
    const token = createToken(data._id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: EMAILSENDER,
          pass: EMAILPASSWORD
      }
    });

    const mailOptions = {
      from: EMAILSENDER,
      to: data.email,
      subject: "DevKomunidad Message",
      html: `
        <h1>Hello ${data.codename}, thanks for joining on DevKomunidad.</h1>
        <p style="font-size: 16px;">You are welcome to ask anything you want and please be respectful to everyone. If you are confused, this is your username to sign in</p>
        <p style="font-size: 16px;">Username: ${ data.username }</p>
        <br>
        <br>
        <p>This is auto generated please do not reply.</p>
      `
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent");
      }
    })

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

module.exports.loginCheck = async (req,res) => {
  const { id, username } = req.body;
  const data = await Users.findById(id);

  if (! data) {
    res.json({ message: "ID doesn't exist", verified: false });
  } else {
    if (data.username !== username) {
      res.json({ message: "ID doesn't match the username", verified: false });
    } else {
      res.json({ userData: data, verified: true });
    }
  }
}