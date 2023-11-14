const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_REQUEST, NOT_FOUND, FORBIDDEN, CREATED_STATUS,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, nameRU, nameEN, _id,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    nameRU,
    nameEN,
    _id,
  })
    .then((movie) => {
      res.status(CREATED_STATUS).send({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        owner: movie.owner,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        _id: movie.id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(NOT_FOUND));
      } else if (userId !== movie.owner.toString()) {
        next(new ForbiddenError(FORBIDDEN));
      } else {
        Movie.findByIdAndRemove(_id)
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};
