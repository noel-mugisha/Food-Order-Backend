import {Request, Response, NextFunction} from 'express';
import { CreateVendorInput } from '../dto/Vendor.dto';

// controller to create a vendor
export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const {name, ownerName, foodType, pincode, address, phone, email, password} = <CreateVendorInput> req.body;

};

// controller to get all vendors
export const GetAllVendors = async (req: Request, res: Response, next: NextFunction) => {

};

// controller to get a specific  vendor
export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {

};