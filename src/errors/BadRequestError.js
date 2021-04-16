const HttpError = require('./HttpError');
const locales = require('../utils/locales');
const localization = require('../utils/locale');

class BadRequestError extends HttpError {
  constructor(message) {
    super(message, 400);
  }

  static fromValidationError(
    err,
    fallback = localization.getLocalizedString(locales.http.badRequest.message),
  ) {
    return new BadRequestError(err.errors
      ? Object.values(err.errors).join('; ')
      : fallback);
  }
}

module.exports = BadRequestError;
