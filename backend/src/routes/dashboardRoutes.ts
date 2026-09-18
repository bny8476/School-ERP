import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/stats')
  .get(authorize('SuperAdmin', 'Admin', 'Principal', 'Accountant', 'Teacher', 'Parent'), getDashboardStats);

export default router;
