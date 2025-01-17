import bcrypt from 'bcrypt';

export const GenerateSalt = async(): Promise<string> => {
    return await bcrypt.genSalt();
}

export const GenerateHashedPassword = async(password: string, salt: string): Promise<string> => {
    return await bcrypt.hash(password, salt);
}