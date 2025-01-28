import express from 'express';
import { GetVendorProfile, VendorLogin } from '../controllers/VendorControllers';
import { Authenticate } from '../middlewares/CommonAuths';

// initiating the router
const router = express.Router();

// middleware for authentication
router.use(Authenticate);
// route to login a vendor
router.post('/login', VendorLogin);

router.get('/profile',Authenticate ,GetVendorProfile);
router.patch('/profile');
router.patch('/service');

export default router;