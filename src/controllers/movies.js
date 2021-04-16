const Movie = require('../models/movie');
const { getError } = require('../utils/errors');
const locales = require('../utils/locales');
const localization = require('../utils/locale');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.json(movies))
  .catch((err) => {
    throw getError(err, req);
  })
  .catch(next);

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.json(movie))
    .catch((err) => {
      throw getError(err, req);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => Movie.findById(req.params.movieId)
  .then((movie) => {
    if (!movie) {
      throw new NotFoundError(localization.getLocalizedString(
        locales.http.notFound.movie,
        req.lang,
      ));
    }
    if (movie.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(localization.getLocalizedString(
        locales.http.forbidden.movie,
        req.lang,
      ));
    }

    return movie.remove();
  })
  .then((movie) => res.json(movie))
  .catch((err) => {
    throw getError(err, req);
  })
  .catch(next);
