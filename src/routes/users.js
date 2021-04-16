const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim()
      .email()
      .required()
      .min(3)
      .max(320),
    name: Joi.string().trim()
      .required()
      .min(2)
      .max(30),
  }),
}), updateUser);

module.exports = router;
