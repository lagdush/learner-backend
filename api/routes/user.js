const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/authorization');

//all
router.post('/', userController.addUser);
router.get('/content/:id', userController.getOneUserContent);

//logged user
router.get('/me', auth.loggedUser, userController.userMe);
router.delete('/:id', auth.loggedUser, userController.deleteMe);

//admin
router.get('/', [auth.loggedUser, auth.isAdmin], userController.getAllUsers);
router.get('/:id', [auth.loggedUser, auth.isAdmin], userController.getOneUser);
router.delete(
  '/:id',
  [auth.loggedUser, auth.isAdmin],
  userController.deleteUser
);

module.exports = router;
