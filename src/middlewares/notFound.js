const NotFoundError = require('../errors/NotFoundError');
const locales = require('../utils/locales');
const localization = require('../utils/locale');

module.exports = (req) => {
  throw new NotFoundError(localization.getLocalizedString(
    locales.http.notFound.message,
    req.lang,
  ));
};
