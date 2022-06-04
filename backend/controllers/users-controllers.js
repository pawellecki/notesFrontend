const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const mockUsers = [
  {
    id: 'u1',
    name: 'pawel',
    email: 'aa@aa.com',
    password: 'uuu',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: mockUsers });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('signup - Invalid inputs passed, check data', 422)
    );
  }

  const { name, email, password, notes } = req.body;

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
    notes,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError('signup failed, try again', 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identyfiedUser = mockUsers.find((user) => user.email === email);

  if (!identyfiedUser || identyfiedUser.password !== password) {
    throw new HttpError('Could not identyfy user, wrong credentials', 401);
  }

  res.json({ message: 'loged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
