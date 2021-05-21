const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signIn, signOut, signUp } = require('../controllers/index');
const movies = require('./movies');
const users = require('./users');
const authHandler = require('../middlewares/auth');
const notFoundHandler = require('../middlewares/notFound');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .min(3)
      .max(320),
    password: Joi.string()
      .required()
      .min(6),
  }),
}), signIn);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .min(3)
      .max(320),
    password: Joi.string()
      .required()
      .min(6),
    name: Joi.string().trim()
      .required()
      .min(2)
      .max(30),
  }),
}), signUp);

router.use(authHandler);

router.use('/movies', movies);
router.use('/users', users);

router.use(notFoundHandler);

module.exports = router;
