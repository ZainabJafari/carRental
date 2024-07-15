import express from 'express';
import cors from 'cors'
import carsRouter from './routes/cars.js' 

const app = express();
app.use(express.json());
app.use(cors());



app.use('/api/cars', carsRouter);

app.listen(8800, () => {
    console.log('API working on port 8000');
});
