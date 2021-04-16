const HttpError = require('./HttpError');
const locales = require('../utils/locales');
const localization = require('../utils/locale');

class ConflictError extends HttpError {
  constructor(message) {
    super(message, 409);
  }

  static fromEntriesString(
    format,
    entries,
    fallback = localization.getLocalizedString(locales.http.conflict.message),
  ) {
    return new ConflictError(format && entries
      ? format(entries)
      : fallback);
  }
}

module.exports = ConflictError;
