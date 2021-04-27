const mongoose = require('mongoose');
const jwt = require('jwt');

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    minLength: 2,
    match: [
      /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,50}$/,
      'Pole imię może zawierać tylko litery',
    ],
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    match: [
      /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,50}$/,
      'Pole nazwisko może zawierać tylko litery',
    ],
  },
  email: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Podano nieprawidłowy adres email',
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  identification: {
    type: String,
    value: { timestamps: true },
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.LEARNER_JWT_PRIVATE_KEY,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRESIN,
    }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

exports.User = User;
