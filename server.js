const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiQuestions = require('./routes/api/questions');
const apiUsers = require('./routes/api/users');
const apiRoot = require('./routes/api/root');

app.use('/api', apiRoot);
app.use('/api/questions', apiQuestions);
app.use('/api/users', apiUsers);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    })
  })
  .catch(err => console.log("Failed to Connect", err));

app.use(express.static(path.resolve("./client/build")));

app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});