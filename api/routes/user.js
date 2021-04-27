const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/authorization');

router.get('/me', auth.loggedUser, userController.userMe);
router.get('/', userController.getAllUsers);
router.get('/:id', [auth.loggedUser, auth.isAdmin], userController.getOneUser);
router.post('/', userController.addUser);

module.exports = router;
