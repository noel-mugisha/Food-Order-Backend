import express, {Request, Response, NextFunction} from 'express';
import { CreateVendor, GetAllVendors, GetVendorById } from '../controllers/AdminControllers';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "Hello from the admin..."})
});

// route to create a vendor
router.post('/vendor', CreateVendor);
// route to get all vendors
router.get('/vendors', GetAllVendors);
// route to get a single vendor
router.get('/vendor/:id', GetVendorById);


export default router;