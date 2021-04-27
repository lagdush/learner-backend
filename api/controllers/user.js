const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

//admin
exports.getAllUsers = async (req, res, next) => {
  const results = {
    allUsersInDatabase: await User.countDocuments(),
  };
  let search;
  const term = req.query.search;
  if (term) {
    search = {
      $text: { $search: term },
    };
  }

  results.results = await User.find(search).select('-password');

  res.send({
    request: {
      type: 'GET',
      description: 'Get all users',
    },
    users: results,
  });
};

exports.getOneUser = async (req, res, next) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) {
    res.status(400).send({ message: 'Podano nieprawidłowy numer id' });
  }
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(400).send({ message: 'Podany użytkownik nie istnieje' });
  }
  res.status(200).send({ user: user });
};

exports.addUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send({
        message: 'Użytkownik o podanym adresie email jest już zarejestrowany.',
      });
    user = new User({
      _id: mongoose.Types.ObjectId(),
      ...req.body,
    });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();
    res.status(201).send({
      message: 'Rejestracja przebiegła pomyślnie.',
      name: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
    });
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.userMe = async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res
      .status(404)
      .send({ message: 'Użytkownik o podanym id nie istnieje.' });
  }

  res.send(user);
};
