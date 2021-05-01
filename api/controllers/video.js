const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Video } = require('../models/video');

exports.getAllVideos = async (req, res) => {
  const results = {
    allVideosInDatabase: await Video.countDocuments(),
  };
  let search;
  const term = req.query.search;
  if (term) {
    search = {
      $text: { $search: term },
    };
  }

  results.results = await Video.find(search);

  res.send({
    request: {
      type: 'GET',
      description: 'Get all videos',
    },
    videos: results,
  });
};

exports.addVideo = async (req, res) => {
  try {
    let video = new Video({
      _id: mongoose.Types.ObjectId(),
      ...req.body,
      userID: req.user._id,
    });
    let user = await User.findByIdAndUpdate(req.user._id, {
      $push: { videos: video },
    });
    user = await user.save();
    video = await video.save();
    res.status(201).send({
      message: 'Link do video został dodany',
      video,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
