import { Router } from "express"
import { GetFoodAvailability, GetFoodIn30Min, GetTopRestaurants, RestaurantById, SearchFoods } from "../controller"

const router = Router()

router.get('/:pincode',GetFoodAvailability)

router.get('/top-restaurants/:pincode',GetTopRestaurants)

router.get('/foods-in-30-min/:pincode',GetFoodIn30Min)

router.get('/search/:pincode',SearchFoods)

router.get('/restaurant/:id',RestaurantById)



export {router as ShoppingRoute}