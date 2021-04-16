/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errors = require('../utils/messages');
const regex = require('../utils/regex');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, errors.validation.email.unique],
      validate: {
        validator: (email) => regex.email.test(email),
        message: errors.validation.email.invalid,
      },
      minlength: [3, errors.validation.email.minlength],
      maxlength: [320, errors.validation.email.maxlength],
      required: [true, errors.validation.email.required],
    },
    password: {
      type: String,
      minlength: [6, errors.validation.password.minlength],
      required: [true, errors.validation.password.required],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, errors.validation.name.minlength],
      maxlength: [30, errors.validation.name.maxlength],
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
