import {Request, Response, NextFunction} from 'express';
import { CreateVendorInput } from '../dto/Vendor.dto';
import {VendorModel} from '../models/VendorModel';

// controller to create a vendor
export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const {name, ownerName, foodType, pincode, address, phone, email, password} = <CreateVendorInput> req.body;
    // saving the vendor to the database

    const createVendor = await VendorModel.create({
        name,
        address,
        pincode,
        foodType,
        email,
        password,
        salt: '',
        ownerName,
        phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
    });

};

// controller to get all vendors
export const GetAllVendors = async (req: Request, res: Response, next: NextFunction) => {

};

// controller to get a specific  vendor
export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {

};