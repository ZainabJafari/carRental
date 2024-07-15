import express from 'express'
import { getCars } from '../controllers/cars.js' 
const router = express.Router()

router.get('/', getCars )

export default router 