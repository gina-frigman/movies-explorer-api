const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { NOT_FOUND, BAD_REQUEST } = require('../utils/constants');

module.exports.getProfileInfo = (req, res, next) => {
  const { userId } = req.params;
  User.findOne({ userId })
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
  const { name } = req.body;
  User.findByIdAndUpdate(userId, { name }, {
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
      } else {
        next(err);
      }
    });
};
