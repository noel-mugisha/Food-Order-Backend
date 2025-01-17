import express, {Request, Response, NextFunction} from 'express';
import { CreateVendor } from '../controllers/AdminControllers';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "Hello from the admin..."})
});

router.post('/vendor', CreateVendor);


export default router;