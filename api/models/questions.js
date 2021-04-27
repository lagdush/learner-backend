const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Answer',
   required: true
  }],
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
});

const Question = mongoose.model('Question', questionsSchema);

exports.Question = Question;
