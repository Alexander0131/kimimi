import express from 'express';
import { initiatePayment } from '../controllers/payStackController.js'; // Make sure the path is correct

const router = express.Router();

// POST route to initiate payment
router.post('/initiate-payment', initiatePayment);

export default router;
