import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.log(err.message)
    })

// Create an express application
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());
// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Handle requests for PayPal API keys
app.use('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// Handle requests for seeding data into database (commented out)
//app.use('/api/seed', seedRouter);

// Handle requests for product data
app.use('/productsList', productRouter);

// Handle requests for user data
app.use('/api/users', userRouter);

// Handle requests for order data
app.use('/api/orders', orderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

// Set the port for the server to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
})