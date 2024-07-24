import express from 'express';
import cors from 'cors'
import carsRouter from './routes/cars.js' 
import bookingsRouter from './routes/booking.js';
import userRouter from "./routes/user.js"

const app = express();
app.use(express.json());
app.use(cors());



app.use('/api/cars', carsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/users',userRouter );

app.listen(8800, () => {
    console.log('API working on port 8000');
});
