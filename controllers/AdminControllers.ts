import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto/Vendor.dto';
import { VendorModel } from '../models/VendorModel';
import { GenerateHashedPassword, GenerateSalt } from '../utility/PasswordHashing';

// Controller to create a vendor
export const CreateVendor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, ownerName, foodType, pincode, address, phone, email, password } = req.body as CreateVendorInput;

        // finding an existing vendor
        const existingVendor = await VendorModel.findOne({ email });
        if (existingVendor !== null) {
            res.status(400).json({ message: 'Vendor already exists' });
        }

        // hashing the password
        const salt = await GenerateSalt();
        const hashedPassword = await GenerateHashedPassword(password, salt);

        // Creating the vendor
        const createdVendor = await VendorModel.create({
            name,
            address,
            pincode,
            foodType,
            email,
            password: hashedPassword,
            salt,
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