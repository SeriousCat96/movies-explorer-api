const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const HttpError = require('../errors/HttpError');
const locales = require('./locales');
const localization = require('./locale');

const MONGO_ERROR_CONFLICT = 11000;

module.exports.getError = (err, req) => {
  if (err instanceof HttpError) return err;

  switch (err.name) {
    case 'CastError':
      if (err.path === '_id') {
        return new BadRequestError(localization.getLocalizedString(
          locales.http.badRequest.params._id,
          req.lang,
        ));
      }
      return new BadRequestError(err);

    case 'ValidationError':
      return BadRequestError.fromValidationError(
        err,
        localization.getLocalizedString(locales.http.badRequest.message, req.lang),
      );

    case 'MongoError':
      if (err.code === MONGO_ERROR_CONFLICT) {
        return ConflictError
          .fromEntriesString(
            localization.format(locales.http.conflict, req.lang),
            err.keyValue,
          );
      }
      return new Error();

    default:
      return new Error();
  }
};
