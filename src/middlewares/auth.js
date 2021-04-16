const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const locales = require('../utils/locales');
const localization = require('../utils/locale');
const { devSecret } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError(localization.getLocalizedString(
      locales.http.unauthorized.message,
      req.lang,
    ));
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
  } catch (err) {
    throw new UnauthorizedError(localization.getLocalizedString(
      locales.http.unauthorized.message,
      req.lang,
    ));
  }

  req.user = payload;

  next();
};
