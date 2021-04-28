const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const users = require('./api/routes/user');
const posts = require('./api/routes/posts');
const login = require('./api/routes/logIn');
const quizzes = require('./api/routes/quiz');


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to Atlas MongoDB');
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/posts', posts);
app.use('/api/quizzes', quizzes);
module.exports = app;
