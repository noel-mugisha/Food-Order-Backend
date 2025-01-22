import bcrypt from 'bcrypt';
import { VandorPayload } from '../dto/Vendor.dto';

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

export const GenerateSignature = async (payload: VandorPayload): Promise<string> => {
    
}