import express from 'express';
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie, getRandTags, searchMovies } from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/tags').get(getRandTags);
router.route('/search').get(searchMovies)
router.route('/:id').get(getMovieById);
router.route('/:id').delete(protect, deleteMovie);
router.route('/:id').put(protect, updateMovie);
router.route('/').get(getMovies);
router.route('/').post(protect, createMovie);

export default router;