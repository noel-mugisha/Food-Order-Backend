import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto/Vendor.dto";
import { VendorModel } from "../models/VendorModel";
import { GenerateSignature, ValidatePassword } from "../utility/PasswordHashing";

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

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
}