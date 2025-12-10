import { Request, Response, NextFunction } from "express";

import { FindVandor } from "./admin.controller";
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP, ValidatePassword } from "../utility";
import { CreateFoodInputs } from "../dto/Food.dto";
import { Food, FoodDoc } from "../models/Foods";
import Vandor from "../models/Vandor";
import { plainToClass } from "class-transformer";
import { CreateCustomerInput, EditCustomerProfileInputs, UserLoginInputs } from "../dto/Customer.dto";
import { validate, ValidationError } from "class-validator";
import Customer from "../models/Customer";
import { verify } from "jsonwebtoken";
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
 
const existCustomer = Customer.findOne({ email: email })

if(existCustomer !== null){
  return res.status(409).json({message:" An user exist with the provided email"})
}

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
  const signature =await GenerateSignature({ 
   _id: result._id,
       email:result.email,
    verified: result.verified
  })

 return res.status(201).json({signature: signature, verified:result.verified,email: result.email})
}
return res.status(400).json({message:"Error with Signup"})
};


export const CustomerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for getting vendor profile
const loginInputs = plainToClass( UserLoginInputs ,req.body)

const loginErrors = await validate(loginInputs, {validationError:{target: false}})

if(loginErrors.length > 0){
  return res.status(400).json(loginErrors)
}

const {email,password} = loginInputs

const customer = await Customer.findOne({email: email})

if(customer){
  const validation = await ValidatePassword(password,customer.password,customer.salt);
  if(validation){
    
 const signature =await GenerateSignature({ 
   _id: customer._id,
       email:customer.email,
    verified: customer.verified
  })

 return res.status(201).json({signature: signature, verified:customer.verified,email: customer.email})


  }
}else{
   
}
return res.status(404).json({message:"login Error "})

};


export const CustomerVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor profile
  const {otp} = req.body

  const customer = req.user;
if(customer){
  const profile = await Customer.findById(customer._id)

if(profile){
  if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()){
profile.verified = true;
const updatedCustomerResponse = await profile.save();


const signature =await GenerateSignature({ 
   _id: updatedCustomerResponse._id,
       email:updatedCustomerResponse.email,
    verified: updatedCustomerResponse.verified
  })

  return res.status(201).json({
    signature: signature,
    verified: updatedCustomerResponse.verified,
    email: updatedCustomerResponse.email
  })
  }
}
}

return res.status(400).json({message:"Error with OTP Validation"})

};

export const RequestOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 const customer = req.user

 if(customer){
  const profile = await Customer.findById(customer._id)

  if(profile){
    const {otp,expiry}= GenerateOtp()
    profile.otp = otp
    profile.otp_expiry = expiry

    await profile.save()
    await onRequestOTP(otp,profile.phone)

    res.status(200).json({message: "OTP sent your registered phone number"})
  }
 }

return res.status(400).json({message:"Error with Request OTP"})

};

export const GetCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor service availability
  const customer = req.user;

  if(customer){
  const profile = await Customer.findById(customer._id)

  if(profile){
   
   return res.status(200).json(profile)
  }
 
  return res.status(400).json({message:"Error with Fetch Profile"})
 }

};
export const EditCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor service availability
   const customer = req.user;
  const profileInputs = plainToClass(EditCustomerProfileInputs,req.body)

  const profileErrors = await validate(profileInputs,{validationError:{target: false}})

  const {firstName, lastName, address} = profileInputs
  if(customer){
  const profile = await Customer.findById(customer._id)

  if(profile){
    profile.firstName =  firstName
    profile.lastName = lastName
    profile.address = address
   
   const result =  await profile.save()
    res.status(200).json(result)
  }
 }
};
