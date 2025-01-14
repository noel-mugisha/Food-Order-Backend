// imports
import express from 'express';
import AdminRoutes from './routes/AdminRoutes';
import VendorRoutes from './routes/VendorRoutes';
import bodyParser from 'body-parser';

// initializing the app
const app = express();

// essential middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

// route middlewares
app.use('/admin', AdminRoutes);
app.use('/vendor', VendorRoutes);

// app is listening on port 3000
app.listen(8000, () => {
    console.log("Food Order Backend is running on port 8000...");
});