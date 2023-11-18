const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(UNAUTHORIZED));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  if (!token) {
    next(new UnauthorizedError(UNAUTHORIZED));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED));
  }

  req.user = payload;
  next();
};
