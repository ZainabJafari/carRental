import express from 'express';
import { addBooking, listBookings } from '../controllers/booking.js';

const router = express.Router();

router.post('/', addBooking);
router.get('/', listBookings);

export default router;
