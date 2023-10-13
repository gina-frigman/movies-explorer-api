const router = require('express').Router();
const { getLikedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateMovieId } = require('../middlewares/validation');

router.get('/', getLikedMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:id', validateMovieId, deleteMovie);

module.exports = router;
