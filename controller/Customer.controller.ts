import { Request, Response, NextFunction } from "express";

import { FindVandor } from "./admin.controller";
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP, ValidatePassword } from "../utility";
import { CreateFoodInputs } from "../dto/Food.dto";
import { Food, FoodDoc } from "../models/Foods";
import Vandor from "../models/Vandor";
import { plainToClass } from "class-transformer";
import { CreateCustomerInput } from "../dto/Customer.dto";
import { validate, ValidationError } from "class-validator";
import Customer from "../models/Customer";
// import { VandorPayload } from "../dto/Vandor.dto";

export const CustomerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 const customerInputs = plainToClass(CreateCustomerInput,req.body) 

 const inputErrors =await validate(customerInputs,{validationError:{target:true}})

 if(inputErrors.length > 0){
  return res.status(400).json(inputErrors)
 }

 const {email,phone,password} = customerInputs;
 
 const salt = await GenerateSalt()
 const userPassword = await GeneratePassword(password,salt)

 const { otp,expiry} = GenerateOtp()
 

 const result = await Customer.create({
  email: email,
  password,
  salt,
  otp,
  otp_expiry: expiry,
  firstName:'',
  lastName:'',
  address:'',
  verified: false, lat:0, lng: 0
 })

 if(result){
  await onRequestOTP(otp,phone)
  // const signature =await GenerateSignature()
 }
};


export const CustomerLogin = async (
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

export const CustomerVerify = async (
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
