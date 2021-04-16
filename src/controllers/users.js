const User = require('../models/user');
const { getError } = require('../utils/errors');
const locales = require('../utils/locales');
const localization = require('../utils/locale');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError(localization.getLocalizedString(
        locales.http.notFound.user,
        req.lang,
      ));
    }
    return res.json(user);
  })
  .catch((err) => {
    throw getError(err, req);
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
      if (!user) {
        throw new NotFoundError(localization.getLocalizedString(
          locales.http.notFound.user,
          req.lang,
        ));
      }
      return res.json(user);
    })
    .catch((err) => {
      throw getError(err, req);
    })
    .catch(next);
};
