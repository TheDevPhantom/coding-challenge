import express from 'express';
import {
  createUsers,
  deleteUser,
  downloadUsersCsv,
  editUser,
  getUser,
  getUsers,
  getUsersReport,
} from '../controllers/users.controller.js';
import { authorize, protect } from '../middleware/auth.js';
import filteredResults from '../middleware/filteredResults.js';
import User from '../models/User.js';

const router = express.Router();

router
  .route('/')
  .get(filteredResults(User), getUsers)
  .post(protect, authorize('admin'), createUsers);

router.get(
  '/csv',
  protect,
  authorize('admin'),
  filteredResults(User),
  downloadUsersCsv
);
router.get(
  '/report',
  protect,
  authorize('admin'),
  filteredResults(User),
  getUsersReport
);

router
  .route('/:id')
  .get(getUser)
  .put(protect, authorize('admin'), editUser)
  .delete(protect, authorize('admin'), deleteUser);

export default router;
