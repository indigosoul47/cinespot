import express from 'express';
import { createLibrary, deleteLibrary, getLibraryById, getLibraries, updateLibrary, deleteReview } from '../controllers/libraryController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/review/:id').delete(protect, deleteReview);
router.route('/:id').get(getLibraryById);
router.route('/:id').delete(protect, deleteLibrary);
router.route('/:id').put(protect, updateLibrary);
router.route('/').get(getLibraries);
router.route('/').post(protect, createLibrary);

export default router;