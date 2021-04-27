const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz');
const auth = require('../middleware/authorization');

//all
router.get('/', quizController.getAllQuizzes);

//user
router.get('/me', auth.loggedUser, quizController.getMyQuizzes);
router.get('/me/:id', auth.loggedUser, quizController.getMyQuizzes);

module.exports = router;
