const locales = require('../utils/locales');
const localization = require('../utils/locale');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || localization.getLocalizedString(
    locales.http.internalServerError.message,
    req.lang,
  );

  res.status(statusCode).json({ message });

  return next();
};
