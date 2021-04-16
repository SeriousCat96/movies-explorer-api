const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signIn, signOut, signUp } = require('../controllers/index');
const movies = require('./movies');
const users = require('./users');
const authHandler = require('../middlewares/auth');

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

router.post('/signout', signOut);

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
      .min(2)
      .max(30),
  }),
}), signUp);

router.use(authHandler);

router.use('/movies', movies);
router.use('/users', users);

module.exports = router;
