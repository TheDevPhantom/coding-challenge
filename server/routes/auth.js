import express from 'express';
import {
  authenticate,
  getMe,
  login,
  logout,
  register,
  updatePassword,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post('/updatepassword', protect, updatePassword);
router.post('/authenticate', protect, authenticate);

export default router;
