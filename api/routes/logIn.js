const loginController = require('../controllers/logIn');
const express = require('express');
const router = express.Router();

router.post('/', loginController.logIn);

module.exports = router;
