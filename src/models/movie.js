const mongoose = require('mongoose');
const errors = require('../utils/messages');
const regex = require('../utils/regex');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, errors.validation.country.required],
    },
    director: {
      type: String,
      required: [true, errors.validation.password.required],
    },
    duration: {
      type: Number,
      required: [true, errors.validation.duration.required],
    },
    year: {
      type: String,
      required: [true, errors.validation.year.required],
    },
    description: {
      type: String,
      required: [true, errors.validation.description.required],
    },
    image: {
      type: String,
      validate: {
        validator: (url) => regex.url.test(url),
        message: errors.validation.image.invalid,
      },
      required: [true, errors.validation.image.required],
    },
    trailer: {
      type: String,
      validate: {
        validator: (url) => regex.url.test(url),
        message: errors.validation.trailer.invalid,
      },
      required: [true, errors.validation.trailer.required],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (url) => regex.url.test(url),
        message: errors.validation.thumbnail.invalid,
      },
      required: [true, errors.validation.thumbnail.required],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, errors.validation.owner.required],
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, errors.validation.movieId.required],
    },
    nameRU: {
      type: String,
      required: [true, errors.validation.nameRU.required],
    },
    nameEN: {
      type: String,
      required: [true, errors.validation.nameEN.required],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
