import { Request, Response, NextFunction } from "express";
import { EditVandorInputs, VandorLoginInput } from "../dto";
import { FindVandor } from "./admin.controller";
import { GenerateSignature, ValidatePassword } from "../utility";
// import { VandorPayload } from "../dto/Vandor.dto";

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
  if (validation) {
    return res.json(signature);
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

  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor(user._id);
    return res.json(existingVandor);
  }
  return res.json({ message: "User not found" });
};

export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor profile
  const { foodType, name, address, phone } = <EditVandorInputs>req.body;

  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor(user._id);
    if (existingVandor !== null) {
      existingVandor.name = name || existingVandor.name;
      existingVandor.foodType = foodType || existingVandor.foodType;
      existingVandor.address = address || existingVandor.address;
      existingVandor.phone = phone || existingVandor.phone;
    }

    return res.json(existingVandor);
  }
  return res.json({ message: "User not found" });
};

export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation for updating vendor service availability

  
  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor(user._id);
    if (existingVandor !== null) {
      existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
      const saveResult = await existingVandor.save();
      return res.json(saveResult);
    }
    
    return res.json(existingVandor);
  }
  return res.json({ message: "User not found" });
};
