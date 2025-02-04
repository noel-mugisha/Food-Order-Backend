//imports
import {Request, Response, NextFunction} from 'express';
import { VendorModel } from '../models/VendorModel';
import { FoodModel } from '../models/FoodModel';

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract and validate pincode
        const { pincode } = req.params;
        if (!pincode) {
            res.status(400).json({ message: "Pincode is required" });
            return;
        }

        // Fetch vendors with available service
        const vendors = await VendorModel.find({ pincode, serviceAvailable: true })
            .sort({ rating: -1 })  // Use recommended syntax
            .populate({ path: 'foods', model: 'Food'});

        // Check if vendors are found
        if (vendors.length === 0) {
            res.status(404).json({ message: "No vendors found in this pincode" });
            return;
        }

        // Send response
        res.status(200).json(vendors);
    } catch (error) {
        console.error("Error fetching food availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {};

export const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction): Promise<void> => {};

export const SearchFoods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {};

export const RestaurantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {};