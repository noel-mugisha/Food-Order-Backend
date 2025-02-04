// imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import AdminRoutes from './routes/AdminRoutes';
import VendorRoutes from './routes/VendorRoutes';
import { MONGODB_URI } from './config/Config';
import ShoppingRoutes from './routes/ShoppingRoutes';

// initializing the app
const app = express();

// essential middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB successfully...');
}).catch(err => console.log('Error connecting to MongoDb:', err));

// route middlewares
app.use('/admin', AdminRoutes);
app.use('/vendor', VendorRoutes);
app.use(ShoppingRoutes);

// app is listening on port 8000
app.listen(8000, () => {
    console.log("Food Order Backend is running on port 8000...");
});