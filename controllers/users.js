const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { NOT_FOUND, BAD_REQUEST, CONFLICT } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');

module.exports.getProfileInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.editProfileInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT));
      } else {
        next(err);
      }
    });
};
