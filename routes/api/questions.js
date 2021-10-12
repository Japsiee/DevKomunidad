const express = require('express');
const Route = express.Router();
const cont = require('../../controllers/questions');

Route.get('/', cont.getQuestion);
Route.post('/', cont.postQuestion);
Route.put('/', cont.putQuestion);

module.exports = Route;