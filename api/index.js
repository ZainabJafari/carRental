import express from 'express';

import carsRouter from './routes/cars.js' 
const app = express();
app.use(express.json());


app.use('/api/cars', carsRouter);

app.listen(8000, () => {
    console.log('API working on port 8000');
});
