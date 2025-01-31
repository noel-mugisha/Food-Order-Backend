import { Request, Response, NextFunction } from "express";
import { EditVendorInputs, VendorLoginInputs } from "../dto/Vendor.dto";
import { VendorModel } from "../models/VendorModel";
import { GenerateSignature, ValidatePassword } from "../utility/AppUtils";

// controller to login a vendor
export const VendorLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password} = <VendorLoginInputs> req.body;
    // find the existing vendor with the email
    const existingVendor = await VendorModel.findOne({email});

    if(!existingVendor) {
        res.status(404).json({message: "The above vendor doesn't exist"});
        return;
    }

    // validate the password
    const existingPassword = existingVendor.password;
    const isPasswordValid = await ValidatePassword(password, existingPassword);

    if(!isPasswordValid) {
        res.status(400).json({message: "Invalid password"});
        return;
    }

    const signature = GenerateSignature({
        _id: existingVendor._id as string,
        email: existingVendor.email,
        name: existingVendor.name,
        foodTypes: existingVendor.foodType
    });

    res.status(200).json(signature);
}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const vendor = (req as any).user;

    if (!vendor) {
        res.status(404).json({ message: "Vendor information not found..." });
        return; // Exit after sending the response
    }

    try {
        const existingVendor = await VendorModel.findById(vendor._id);

        if (!existingVendor) {
            res.status(404).json({ message: "Vendor not found in the database." });
            return; // Exit if vendor does not exist
        }

        res.status(200).json(existingVendor); // Return the found vendor
    } catch (error) {
        console.error('Error fetching vendor profile:', error);
        res.status(500).json({ message: "An error occurred while fetching vendor profile." });
    }
};

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, address, phone, foodTypes } = <EditVendorInputs>req.body;
    const vendor = (req as any).user;

    // retreive the existing user in the database
    const existingVendor = await VendorModel.findById(vendor._id);

    if (!existingVendor) {
        res.status(404).json({message: "Vendor not found in the database."});
        return;
    }

    existingVendor.name = name;
    existingVendor.address = address;
    existingVendor.phone = phone;
    existingVendor.foodType = foodTypes;

    const updatedVendor = await existingVendor.save();

    res.status(200).json({ message: "Vendor data updated sussceffuly..", vendor: existingVendor});
    return;
}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: Vendor information not found." });
            return;
        }

        const existingVendor = await VendorModel.findById(req.user._id);
        if (!existingVendor) {
            res.status(404).json({ message: "Vendor not found in the database." });
            return;
        }

        // Toggle service availability
        existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
        const updatedVendor = await existingVendor.save();

        res.status(200).json({ message: "Vendor service updated successfully.", vendor: updatedVendor });
    } catch (error) {
        console.error("Error updating vendor service:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};




export const AddFood = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user as any;
    
}

export const GetFoods = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    
}