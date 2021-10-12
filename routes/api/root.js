const express = require('express');
const Route = express.Router();
const auth = require('../../middlewares/auth');

Route.all('/auth', auth, (req,res) => {
  res.json({ authenticated: true });
})

Route.get('/logout', (req,res) => {
  res.cookie("auth", "", { maxAge: 1 });
  res.json({ logout: true });
})

module.exports = Route;