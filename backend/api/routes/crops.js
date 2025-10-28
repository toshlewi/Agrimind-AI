import express from 'express';
import {
  getCropRecommendations,
  getYieldPrediction,
  getCropHistory
} from '../controllers/cropController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateCropPrediction } from '../middleware/validation.js';

const router = express.Router();

router.post('/recommendations', authenticateToken, validateCropPrediction, getCropRecommendations);
router.post('/yield-prediction', authenticateToken, getYieldPrediction);
router.get('/history', authenticateToken, getCropHistory);

export default router;