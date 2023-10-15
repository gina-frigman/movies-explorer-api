const { default: mongoose } = require('mongoose');
const validator = require('validator');
const { REQUIRED, INCORRECT_URL, protocols } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, REQUIRED],
  },
  director: {
    type: String,
    required: [true, REQUIRED],
  },
  duration: {
    type: Number,
    required: [true, REQUIRED],
  },
  year: {
    type: String,
    required: [true, REQUIRED],
  },
  description: {
    type: String,
    required: [true, REQUIRED],
  },
  image: {
    type: String,
    required: [true, REQUIRED],
    validate: {
      validator(image) {
        validator.isURL(image, protocols);
      },
      message: INCORRECT_URL,
    },
  },
  trailerLink: {
    type: String,
    required: [true, REQUIRED],
    validate: {
      validator(trailerLink) {
        validator.isURL(trailerLink, protocols);
      },
      message: INCORRECT_URL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, REQUIRED],
    validate: {
      validator(thumbnail) {
        validator.isURL(thumbnail, protocols);
      },
      message: INCORRECT_URL,
    },
  },
  owner: {
    required: [true, REQUIRED],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, REQUIRED],
  },
  nameRU: {
    type: String,
    required: [true, REQUIRED],
  },
  nameEN: {
    type: String,
    required: [true, REQUIRED],
  },
});

module.exports = mongoose.model('movie', movieSchema);
