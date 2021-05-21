const mongoose = require('mongoose');
const locales = require('../utils/locales');
const regex = require('../utils/regex');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, locales.validation.country.required],
    },
    director: {
      type: String,
      required: [true, locales.validation.password.required],
    },
    duration: {
      type: Number,
      required: [true, locales.validation.duration.required],
    },
    year: {
      type: String,
      required: [true, locales.validation.year.required],
    },
    description: {
      type: String,
      required: [true, locales.validation.description.required],
    },
    image: {
      type: String,
      validate: {
        validator: (url) => regex.url.test(url),
        message: locales.validation.image.invalid,
      },
      required: [true, locales.validation.image.required],
    },
    trailer: {
      type: String,
      validate: {
        validator: (url) => regex.url.test(url),
        message: locales.validation.trailer.invalid,
      },
      required: [true, locales.validation.trailer.required],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (url) => regex.url.test(url),
        message: locales.validation.thumbnail.invalid,
      },
      required: [true, locales.validation.thumbnail.required],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, locales.validation.owner.required],
    },
    movieId: {
      type: Number,
      required: [true, locales.validation.movieId.required],
    },
    nameRU: {
      type: String,
      required: [true, locales.validation.nameRU.required],
    },
    nameEN: {
      type: String,
      required: [true, locales.validation.nameEN.required],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
