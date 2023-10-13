const { default: mongoose } = require('mongoose');
const validator = require('validator');
const { REQUIRED, INCORRECT_URL } = require('../utils/constants');

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
      validator(url) {
        validator.isUrl(url);
      },
      message: INCORRECT_URL,
    },
  },
  trailerLink: {
    type: String,
    required: [true, REQUIRED],
    validate: {
      validator(url) {
        validator.isUrl(url);
      },
      message: INCORRECT_URL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, REQUIRED],
    validate: {
      validator(url) {
        validator.isUrl(url);
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
