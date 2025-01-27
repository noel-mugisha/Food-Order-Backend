import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto/Vendor.dto';
import { APP_SECRET } from '../config/Config';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';

// Function to generate salt
export const GenerateSalt = async (): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt();
        return salt;
    } catch (error) {
        throw new Error('Error generating salt');
    }
};

// Function to generate hashed password
export const GenerateHashedPassword = async (password: string, salt: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error generating hashed password');
    }
};

// Function to validate password
export const ValidatePassword = async (enteredPassword: string, savedPassword: string): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, savedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error validating password');
    }
};

// Function to generate signature
export const GenerateSignature = (payload: VendorPayload): string => {
    try {
        const token = jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
        return token;
    } catch (error) {
        throw new Error('Error generating signature');
    }
};

// Function to verify the JWT signature
export const VerifySignature = (req: Request): boolean => {
    try {
        const authorizationHeader = req.headers.authorization;
        // Ensure the Authorization header exists
        if (!authorizationHeader) {
            console.error('Authorization header is missing.');
            return false;
        }
        // Extract the token by splitting the Bearer scheme
        const token = authorizationHeader.split(' ')[1];
        // Verify the token and extract the payload
        const payload = jwt.verify(token, APP_SECRET) as AuthPayload;
        // Attach the payload to the request object (assuming req.user exists)
        (req as any).user = payload;

        return true;
    } catch (error) {
        console.error('Error verifying signature:', (error as Error).message);
        return false;
    }
};