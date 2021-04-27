const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middleware/authorization');

//all
router.get('/', postController.getAllPosts);
//admin
router.get('/:id', [auth.loggedUser, auth.isAdmin], postController.deletePost);
//logged user
router.get('/me', auth.loggedUser, postController.getMyPosts);
router.get('/me/:id', auth.loggedUser, postController.getMyPost);
router.post('/me', auth.loggedUser, postController.addPost);
router.put('/me/:id', auth.loggedUser, postController.updateMyPost);
router.delete('/me/:id', auth.loggedUser, postController.deleteMyPost);
module.exports = router;
