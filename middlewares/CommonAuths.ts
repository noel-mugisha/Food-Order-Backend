import { AuthPayload } from "../dto/Auth.dto";
import { Request, Response, NextFunction } from "express";
import { VerifySignature } from "../utility/AppUtils";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

// middleware to authenticate the user
export const Authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const validate = VerifySignature(req);

    if (!validate) {
        res.status(401).json({ message: 'User not Authorized..'});
        return;
    }

    next();
}




