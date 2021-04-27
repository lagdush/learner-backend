const mongoose = require('mongoose');
const { Quiz } = require('../models/quiz');

//all
exports.getAllQuizzes = async (req, res) => {
  try {
    const results = {
      allQuizzesInDatabase: await Quiz.countDocuments(),
    };
    let search;
    const term = req.query.search;
    if (term) {
      search = {
        $text: { $search: term },
      };
    }

    results.results = await Quiz.find(search);

    res.send({
      request: {
        type: 'GET',
        description: 'Get all quizzes',
      },
      quizzes: results,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//logged
exports.getMyQuizzes = async (req, res) => {
  const results = {
    allQuizzesInDatabase: await Quiz.countDocuments(),
  };
  let search;
  const term = req.query.search;
  if (term) {
    search = {
      $text: { $search: term },
    };
  }

  results.results = await Quiz.find(search);

  res.send({
    request: {
      type: 'GET',
      description: 'Get all my quizzes',
    },
    quizzes: results,
  });
};

exports.addQuiz = async (req, res) => {
  try {
    let quiz = new Quiz({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      questions: req.body.questions,
      userID: req.user._id,
    });
    quiz = await quiz.save();
    res.status(201).send({
      message: 'Quiz został dodany',
      quiz,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
