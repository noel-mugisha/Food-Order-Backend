import express from 'express';
import { AddFoodItem, GetFoods, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers/VendorControllers';
import { Authenticate } from '../middlewares/CommonAuths';

// initiating the router
const router = express.Router();

// route to login a vendor
router.post('/login',VendorLogin);

// middleware for authentication
router.use(Authenticate);


// route to get a vendor profile
router.get('/profile',GetVendorProfile);
// route to update a vendor profile
router.patch('/profile',UpdateVendorProfile);
router.patch('/service', UpdateVendorService);
// route to add food items
router.post('/food', AddFoodItem);
// route to get all food items
router.get('/foods', GetFoods);

export default router;