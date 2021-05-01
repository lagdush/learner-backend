const express = require('express');
const videoControllers = require('../controllers/video');
const router = express.Router();

router.get('/', videoControllers.getAllVideos);


module.exports = router;