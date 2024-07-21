import express from 'express';
import { getCars, getCarById } from '../controllers/cars.js';

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);


export default router;
