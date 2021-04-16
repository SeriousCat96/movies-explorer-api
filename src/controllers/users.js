const User = require('../models/user');
const { getError } = require('../utils/errors');
const errors = require('../utils/messages');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) throw new NotFoundError(errors.http.notFound.user);
    return res.json(user);
  })
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError(errors.http.notFound.user);
      return res.json(user);
    })
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};
