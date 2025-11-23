import { Request, Response, NextFunction } from "express";
import { VandorLoginInput } from "../dto";
import { FindVandor } from "./admin.controller";
import { GenerateSignature, ValidatePassword } from "../utility";

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VandorLoginInput>req.body;
  const existingVandor = await FindVandor("", email);
  if (!existingVandor) {
    return res.status(404).json({ message: "Vandor not found" });
  }
  const validation = await ValidatePassword(
    password,
    existingVandor.password,
    existingVandor.salt
  );

  const signature = GenerateSignature({
    _id: existingVandor.id,
    email: existingVandor.email,
    name: existingVandor.name,
    foodType: existingVandor.foodType,
  });
  if(validation){
    return res.json(signature)
  }

  if (!validation) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  return res
    .status(200)
    .json({ message: "Login Successful", vandor: existingVandor });
};

export const GetVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for getting vendor profile
};

export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor profile
};
