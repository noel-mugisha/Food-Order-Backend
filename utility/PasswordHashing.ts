import bcrypt from 'bcrypt';
import { VendorPayload } from '../dto/Vendor.dto';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config/Config';

// function to generate salt
export const GenerateSalt = async(): Promise<string> => {
    return await bcrypt.genSalt();
}
// function to generate hashed password
export const GenerateHashedPassword = async(password: string, salt: string): Promise<string> => {
    return await bcrypt.hash(password, salt);
}
// function to validate password
export const ValidatePassword = async (enteredPassword: string, savedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(enteredPassword, savedPassword);
}

export const GenerateSignature = (payload: VendorPayload) => {
    return jwt.sign(payload, APP_SECRET, { expiresIn: '1d'});
}