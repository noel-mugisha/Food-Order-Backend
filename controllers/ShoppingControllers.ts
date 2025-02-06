//imports
import {Request, Response, NextFunction} from 'express';
import { VendorModel } from '../models/VendorModel';
import { FoodModel, FoodDoc } from '../models/FoodModel';

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


export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract and validate pincode
        const { pincode } = req.params;
        if (!pincode) {
            res.status(400).json({ message: "Pincode is required" });
            return;
        }

        // Fetch vendors with available service
        const vendors = await VendorModel.find({ pincode, serviceAvailable: true })
            .sort({ rating: -1 })
            .limit(5)

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

export const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract and validate pincode
        const { pincode } = req.params;
        if (!pincode) {
            res.status(400).json({ message: "Pincode is required" });
            return;
        }

        // Fetch vendors with available service
        const vendors = await VendorModel.find({ pincode, serviceAvailable: true })
            .populate({ path: 'foods', model: 'Food' });

        // Check if vendors are found
        if (!vendors.length) {
            res.status(404).json({ message: "No vendors found in this pincode" });
            return;
        }

        // Get all foods that are ready in 30 minutes or less
        const foodResult: FoodDoc[] = vendors.flatMap(vendor =>
            (vendor.foods ?? []).filter((food: FoodDoc) => food.readyTime !== undefined && food.readyTime <= 30)
        );

        // Send response
        res.status(200).json(foodResult);
        return;
    } catch (error) {
        console.error("Error fetching food availability:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};


export const SearchFoods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract pincode from request params
        const { pincode } = req.params;

        if (!pincode) {
            res.status(400).json({ message: "Pincode is required" });
            return;
        }

        // Fetch vendors that serve in the given pincode, including their food data
        const vendors = await VendorModel.find({ pincode }).populate({ path: "foods", model: "Food" });

        if (vendors.length === 0) {
            res.status(404).json({ message: "No vendors found in this pincode" });
            return;
        }

        // Send response
        res.status(200).json(vendors);
        return;
    } catch (error) {
        console.error("Error fetching food data:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const RestaurantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract restaurant ID from request params
        const restaurantId = req.params.id;
        if (!restaurantId) {
            res.status(400).json({ message: "Restaurant ID is required" });
            return;
        }

        // Fetch restaurant details with populated food data
        const restaurant = await VendorModel.findById(restaurantId).populate({ path: "foods", model: "Food" });

        if (!restaurant) {
            res.status(404).json({ message: "Restaurant not found" });
            return;
        }

        // Send response
        res.status(200).json(restaurant);
        return;
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
