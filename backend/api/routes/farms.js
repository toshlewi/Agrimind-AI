import express from 'express';
import {
  createFarmRecord,
  getFarmRecords,
  updateFarmRecord,
  deleteFarmRecord,
  getFarmAnalytics
} from '../controllers/farmController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/records', authenticateToken, createFarmRecord);
router.get('/records', authenticateToken, getFarmRecords);
router.put('/records/:id', authenticateToken, updateFarmRecord);
router.delete('/records/:id', authenticateToken, deleteFarmRecord);
router.get('/analytics', authenticateToken, getFarmAnalytics);

export default router;