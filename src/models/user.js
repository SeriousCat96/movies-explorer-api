/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const locales = require('../utils/locales');
const regex = require('../utils/regex');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, locales.validation.email.unique],
      validate: {
        validator: (email) => regex.email.test(email),
        message: locales.validation.email.invalid,
      },
      minlength: [3, locales.validation.email.minlength],
      maxlength: [320, locales.validation.email.maxlength],
      required: [true, locales.validation.email.required],
    },
    password: {
      type: String,
      minlength: [6, locales.validation.password.minlength],
      required: [true, locales.validation.password.required],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, locales.validation.name.minlength],
      maxlength: [30, locales.validation.name.maxlength],
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
