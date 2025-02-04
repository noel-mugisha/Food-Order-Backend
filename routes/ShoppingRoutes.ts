// imports
import express from 'express';
import { GetFoodAvailability, GetFoodsIn30Min, GetTopRestaurants, RestaurantById, SearchFoods } from '../controllers/ShoppingControllers';

// initiating the router
const router = express.Router();

// Food availability
router.get('/:pincode', GetFoodAvailability);

// Top-restaurants
router.get('/top-restaurants/:pincode', GetTopRestaurants);

// Food available in 30 minutes
router.get('/foods-in-30-mins/:pincode', GetFoodsIn30Min);

// Search foods
router.get('/search/:pincode', SearchFoods);

// Find restaurant by Id
router.get('/restaurant/:id', RestaurantById);


export default router;

