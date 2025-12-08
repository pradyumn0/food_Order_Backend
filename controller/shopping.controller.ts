import { Request, Response, NextFunction } from "express";
import { EditVandorInputs, VandorLoginInput } from "../dto";
import { FindVandor } from "./admin.controller";
import { GenerateSignature, ValidatePassword } from "../utility";
import { CreateFoodInputs } from "../dto/Food.dto";
import { Food, FoodDoc } from "../models/Foods";
import Vandor from "../models/Vandor";
// import { VandorPayload } from "../dto/Vandor.dto";

export const GetFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const  pincode  = req.params.pincode;
  const result = await Vandor.find({pincode: pincode, serviceAvailable:false}).sort([['rating','descending']]).populate("foods")

  if(result.length >0){
   return res.status(200).json(result)
  }

return res.status(400).json({message:"No Data Found!"})

};


export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for getting vendor profile
  const  pincode  = req.params.pincode;
  const result = await Vandor.find({pincode: pincode, serviceAvailable:false}).sort([['rating','descending']]).limit(10)

  if(result.length >0){
   return res.status(200).json(result)
  }

return res.status(400).json({message:"No Data Found!"})

};

export const GetFoodIn30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor profile
  const  pincode  = req.params.pincode;
  const result = await Vandor.find({pincode: pincode, serviceAvailable:false}).populate("foods")

  if(result.length >0){
    let foodResult: any =[]
    result.map(vandor =>{
      const foods = vandor.foods as [FoodDoc]
      foodResult.push(...foods.filter(food=> food.readyTime <= 30))
    })
   return res.status(200).json(foodResult)
  }

return res.status(400).json({message:"No Data Found!"})

};

export const SearchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   const  pincode  = req.params.pincode;
  const result = await Vandor.find({pincode: pincode, serviceAvailable:false}).populate("foods")

  if(result.length >0){
     let foodResult: any =[]
    result.map(item =>foodResult.push(...item.foods))

   return res.status(200).json(foodResult)
  }

return res.status(400).json({message:"No Data Found!"})

};

export const RestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor service availability
  const  id  = req.params.id;
  const result = await Vandor.findById(id).populate("foods")

  if(result){
   return res.status(200).json(result)
  }

return res.status(400).json({message:"No Data Found!"})

};
