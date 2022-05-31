const { randomUUID } = require('crypto');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

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

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError('signup -Invalid inputs passed, check data', 422);
  }

  const { name, email, password } = req.body;

  const newUser = {
    id: randomUUID(),
    name,
    email,
    password,
  };

  mockUsers.push(newUser);

  res.status(200).json({ user: newUser });
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
