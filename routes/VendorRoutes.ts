import express from 'express';
import { VendorLogin } from '../controllers/VendorControllers';

// initiating the router
const router = express.Router();

// route to login a vendor
router.post('/login', VendorLogin);

router.get('/profile');
router.patch('/profile');
router.patch('/service');




export default router;