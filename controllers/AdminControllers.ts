import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto/Vendor.dto';
import { VendorModel } from '../models/VendorModel';
import { GenerateHashedPassword, GenerateSalt } from '../utility/AppUtils';

// Controller to create a vendor
export const CreateVendor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, ownerName, foodType, pincode, address, phone, email, password } = req.body as CreateVendorInput;

        // Find an existing vendor
        const existingVendor = await VendorModel.findOne({ email });
        if (existingVendor) {
            res.status(400).json({ message: 'Vendor already exists' });
            return;
        }

        // Hash the password
        const salt = await GenerateSalt();
        const hashedPassword = await GenerateHashedPassword(password, salt);

        // Create the vendor
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

// Controller to get all vendors
export const GetAllVendors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allVendors = await VendorModel.find();

        if (allVendors.length === 0) {
            res.status(404).json({ message: 'No vendors found' });
            return;
        }

        res.status(200).json(allVendors);
    } catch (error) {
        next(error);
    }
};

// Controller to get a specific vendor
export const GetVendorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Find the vendor by ID
        const vendor = await VendorModel.findById(id);

        if (!vendor) {
            res.status(404).json({ message: 'Vendor not found' });
            return;
        }

        res.status(200).json(vendor);
    } catch (error) {
        next(error);
    }
};
