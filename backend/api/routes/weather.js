import express from 'express';
import {
  getCurrentWeather,
  getWeatherHistory
} from '../controllers/weatherController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/current', authenticateToken, getCurrentWeather);
router.get('/history', authenticateToken, getWeatherHistory);

export default router;