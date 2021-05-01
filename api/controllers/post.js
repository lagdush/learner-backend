const mongoose = require('mongoose');
const { Post } = require('../models/posts');
const { User } = require('../models/user');

exports.getAllPosts = async (req, res) => {
  const results = {
    allPostsInDatabase: await Post.countDocuments(),
  };
  let search;
  const term = req.query.search;
  if (term) {
    search = {
      $text: { $search: term },
    };
  }

  results.results = await Post.find(search);

  res.send({
    request: {
      type: 'GET',
      description: 'Get all posts',
    },
    posts: results,
  });
};

exports.getOnePost = async (req, res, next) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    res.status(400).send({ message: 'Podano nieprawidłowy numer id' });
  }
  const post = await Post.findById(req.params.id).select('-password');
  if (!post) {
    res.status(400).send({ message: 'Podany użytkownik nie istnieje' });
  }
  res.status(200).send({ post: post });
};

exports.getMyPosts = async (req, res) => {
  const results = {
    allPostsInDatabase: await Post.countDocuments(),
  };
  let search;
  const term = req.query.search;
  if (term) {
    search = {
      $text: { $search: term },
    };
  }

  results.results = await Post.find(search);

  res.send({
    request: {
      type: 'GET',
      description: 'Get all posts',
    },
    posts: results,
  });
};

exports.getMyPost = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (isIdValid) {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .send({ message: 'Post, której szukasz nie istnieje' });
    }

    if (post.userID != req.user._id) {
      return res
        .status(403)
        .send({ message: 'Brak uprawnień do wykonania tej operacji.' });
    }

    res.send({
      request: {
        type: 'GET',
        description: 'Get all posts',
      },
      post,
    });
  } else {
    res.status(400).send({ message: 'Podano błędny numer _id' });
  }
};

exports.addPost = async (req, res) => {
  try {
    let post = new Post({
      _id: mongoose.Types.ObjectId(),
      ...req.body,
      userID: req.user._id,
    });
    let user = await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: post },
    });
    post = await post.save();
    user = await user.save();
    res.status(201).send({
      message: 'Post został dodany',
      post,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (isIdValid) {
    const post = await Post.findByIdAndRemove(req.params.id);

    if (!post) {
      return res
        .status(404)
        .send({ message: 'Post, którego szukasz nie istnieje' });
    }

    res.status(202).send({
      message: 'Post został usunięty',
      request: {
        type: 'DELETE',
      },
      post,
    });
  } else {
    res.status(400).send({ message: 'Podano błędny numer _id' });
  }
};

exports.deleteMyPost = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (isIdValid) {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .send({ message: 'Post, którego szukasz nie istnieje' });
    }

    if (post.userID != req.user._id) {
      return res
        .status(403)
        .send({ message: 'Brak uprawnień do wykonania tej operacji.' });
    }

    await Post.findByIdAndRemove(req.params.id);

    res.status(202).send({
      message: 'Post został usuniety',
      request: {
        type: 'DELETE',
      },
      post,
    });
  } else {
    res.status(400).send({ message: 'Podano błędny numer _id' });
  }
};

exports.updateMyPost = async (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    res.status(400).send({ message: 'Podano błędny numer _id' });
    return;
  }
  try {
    let post = await Post.findByIdAndUpdate(req.params.id, ...req.body, {
      new: true,
    });
    res.status(200).send({
      message: 'Post został zaktualizowany',
      request: {
        type: 'PUT',
      },
      post,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
