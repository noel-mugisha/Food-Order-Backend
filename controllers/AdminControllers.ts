import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto/Vendor.dto';
import { VendorModel } from '../models/VendorModel';

// Controller to create a vendor
export const CreateVendor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, ownerName, foodType, pincode, address, phone, email, password } = req.body as CreateVendorInput;

        // Creating the vendor
        const createdVendor = await VendorModel.create({
            name,
            address,
            pincode,
            foodType,
            email,
            password,
            salt: 'salt', // You should generate a proper salt and hash the password before saving it
            ownerName,
            phone,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
        });

        res.status(201).json(createdVendor);
    } catch (error) {
        next(error);
    }
};

// controller to get all vendors
export const GetAllVendors = async (req: Request, res: Response, next: NextFunction) => {

};

// controller to get a specific  vendor
export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {

};