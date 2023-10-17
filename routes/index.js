const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { signup, signin } = require('../controllers/sign');
const NotFoundError = require('../errors/NotFoundError');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');

router.post('/sign-up', validateSignUp, signup);
router.post('/sign-in', validateSignIn, signin);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('страницы не существует'));
});

module.exports = router;
