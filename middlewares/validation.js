const { celebrate, Joi } = require('celebrate');
const { validateId, regex } = require('../utils/constants');

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateEditProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regex),
    trailerLink: Joi.string().required().regex(regex),
    thumbnail: Joi.string().required().regex(regex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: validateId,
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: validateId,
  }),
});
