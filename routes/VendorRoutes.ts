import express from 'express';
import { GetVendorProfile, UpdateVendorProfile, VendorLogin } from '../controllers/VendorControllers';
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
router.patch('/service');

export default router;