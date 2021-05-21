const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const regex = require('../utils/regex');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().trim().required(),
    director: Joi.string().trim().required(),
    duration: Joi.number().required(),
    year: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    image: Joi.string().trim()
      .regex(regex.url)
      .required(),
    trailer: Joi.string().trim()
      .regex(regex.url)
      .required(),
    thumbnail: Joi.string().trim()
      .regex(regex.url)
      .required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().trim().required(),
    nameEN: Joi.string().trim().required(),
  }).unknown(true),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().trim()
      .hex()
      .length(24),
  }),
}), deleteMovie);

module.exports = router;
