import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import Vandor from "../models/Vandor";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVandor= async (id:string|number,email?:string|undefined)=>{
  if(id){
    return await Vandor.findById(id)
  } else if(email){
    return await Vandor.findOne({email:email})
  } else {
    throw new Error("Invalid search parameters")
  }   
}


export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVandorInput>req.body;

const existingVandor = await FindVandor('',email);
if(existingVandor){
  return res.status(400).json({message:"Vandor already exist"})
}

const salt = await GenerateSalt();
const userpassword = await GeneratePassword(password,salt)
  const CreateVandor = await Vandor.create({
    name,
    address,
    pincode,
    foodType,
    email,
    password:userpassword,
    salt:salt,
    ownerName,
    phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    foods: []
  });

  return res.json( CreateVandor);
};
export const GetVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

const vandors = await Vandor.find();
if(!vandors){
  return res.status(404).json({message:"No Vandor Found"})  }

  return res.json(vandors);
}


;
export const GetVandorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
const vandorId = req.params.id;
const vandor = await FindVandor(vandorId);
if(!vandor){
  return res.status(404).json({message:"No Vandor Found for this id"})  }

  return res.json(vandor);

};
