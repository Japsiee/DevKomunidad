const express = require('express');
const Route = express.Router();
const cont = require('../../controllers/users');

Route.post('/create-account', cont.signupUser);
Route.post('/login', cont.loginUser);
Route.post('/checklogin', cont.loginCheck);

module.exports = Route;