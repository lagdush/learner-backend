const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Answer = mongoose.model('Answer', answersSchema);

exports.Answer = Answer;
