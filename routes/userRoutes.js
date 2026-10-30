import express from 'express';
import { authenticate, deletetUser, fetchDetails, getUsers, register, update } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(register);
router.route('/').get(protect, getUsers);
router.route('/').put(protect, update);
router.route('/login').post(authenticate);
router.route('/:id').get(protect, fetchDetails);
router.route('/:id').delete(protect, deletetUser);

export default router;
