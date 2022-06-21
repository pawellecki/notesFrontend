const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, 'email name');
  } catch (err) {
    return next(new HttpError('fetching users failed', 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('signup - Invalid inputs passed, check data', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('signup failed, try again later', 500));
  }

  if (existingUser) {
    return next(
      new HttpError('user exists already, please login instead', 422)
    );
  }

  const newUser = new User({
    name,
    email,
    password,
    image:
      'https://image.shutterstock.com/image-photo/closeup-portrait-funny-ginger-cat-600w-1563541219.jpg',
    notes: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError('signup failed, try again', 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email }).populate('notes');
  } catch (err) {
    return next(new HttpError('logging in failed, try again later', 500));
  }

  if (!user || user.password !== password) {
    return next(
      new HttpError('invalid credentials, could not log you in', 401)
    );
  }

  res.json({ message: 'logged in', user });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
