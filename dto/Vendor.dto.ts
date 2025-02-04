export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    serviceAvailable: boolean;
    password: string;
    rating: number;
}

export interface VendorLoginInputs {
    email: string;
    password: string;
}

export interface VendorPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string]
}

export interface EditVendorInputs {
    name: string;
    address: string;
    phone: string;
    foodTypes: [string];
}