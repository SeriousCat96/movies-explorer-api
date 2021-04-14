const Movie = require('../models/movie');
const { getError } = require('../utils/errors');
const errors = require('../utils/messages');
const ForbiddenError = require('../errors/NotFoundError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => Movie.find({})
  .populate('owner')
  .then((movies) => res.json(movies))
  .catch((err) => {
    throw getError(err);
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
    .then((movie) => Movie.populate(movie, 'owner'))
    .then((movie) => res.json(movie))
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => Movie.findById(req.params.movieId)
  .then((movie) => {
    if (!movie) throw new NotFoundError(errors.http.notFound.format('Фильма'));
    if (movie.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(errors.http.forbidden.movie);
    }

    return Movie
      .findByIdAndDelete(req.params.movieId)
      .populate('owner');
  })
  .then((movie) => res.json(movie))
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);
