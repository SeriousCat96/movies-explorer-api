const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getError } = require('../utils/errors');
const { devSecret } = require('../utils/constants');

const TOKEN_MAX_AGE = 3600000 * 24 * 7;

function getUserJson(data) {
  const user = data.toObject();
  delete user.password;

  return user;
}

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(({ _id }) => {
      const token = jwt.sign(
        { _id },
        NODE_ENV === 'production' ? JWT_SECRET : devSecret,
        { expiresIn: TOKEN_MAX_AGE },
      );

      return res
        .cookie('token', token, { maxAge: TOKEN_MAX_AGE, httpOnly: true, sameSite: true })
        .send({});
    })
    .catch((err) => {
      throw getError(err, req);
    })
    .catch(next);
};

module.exports.signOut = (req, res) => res
  .cookie('token', { maxAge: 0 })
  .send({});

module.exports.signUp = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name,
        about,
        avatar,
        email,
        password: hash,
      },
    ))
    .then((user) => res.status(201).json(getUserJson(user)))
    .catch((err) => {
      throw getError(err, req);
    })
    .catch(next);
};
