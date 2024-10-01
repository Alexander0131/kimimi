import express from 'express';
import { initiatePayment } from '../controllers/paymentController.js';

const router = express.Router();

// POST route to initiate payment
router.post('/initiate-payment', initiatePayment);

export default router;
