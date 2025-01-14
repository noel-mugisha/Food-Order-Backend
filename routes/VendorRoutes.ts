import express from 'express';
import { CreateVendor, GetAllVendors, GetVendorById } from '../controllers/AdminControllers';

// initiating the router
const router = express.Router();

// route to create a vendor
router.post('/', CreateVendor);

// router to get all vendors
router.get('/', GetAllVendors);

// route to get a vendor by Id
router.get('/:id', GetVendorById);


export default router;