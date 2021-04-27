const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middleware/authorization');

//admin
router.get('/', postController.getAllPosts);

//user
router.get('/me', auth.loggedUser, postController.getMyPosts);
router.get('/me/:id', auth.loggedUser, postController.getMyPost);
router.post('/me', auth.loggedUser, postController.addPost);

module.exports = router;
