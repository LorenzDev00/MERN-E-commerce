import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.log(err.message)
    })

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exposes the PayPal client ID to the frontend
app.use('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// Disabled in production: only used to seed the database with initial data
//app.use('/api/seed', seedRouter);

// Route groups
app.use('/productsList', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
})
