const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/me', userController.userMe);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/', userController.addUser);

module.exports = router;