import { Request, Response, NextFunction } from "express";
import { EditVandorInputs, VandorLoginInput } from "../dto";
import { FindVandor } from "./admin.controller";
import { GenerateSignature, ValidatePassword } from "../utility";
import { CreateFoodInputs } from "../dto/Food.dto";
import { Food } from "../models/Foods";
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

export const UpdateVandorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const vandor = await FindVandor(user._id);
    if (vandor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      // vandor.foods.push(createFood)
      vandor.coverImages.push(...images);
      // vandor.coverImage

      const result = await vandor.save();

      return res.json(result);
    }
  }

  return res.json({ message: "Something went wrong with add Foods " });
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

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInputs
    >req.body;

    const vandor = await FindVandor(user._id);
    if (vandor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);
      const createFood = await Food.create({
        vandorId: vandor._id,
        name,
        description,
        category,
        foodType,
        images,
        readyTime,
        price,
        rating: 0,
      });

      vandor.foods.push(createFood);
      const result = await vandor.save();

      return res.json(result);
    }
  }

  return res.json({ message: "Something went wrong with add Foods " });
};

export const GetFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const foods = await Food.find({ vandorId: user._id });

    if (foods !== null) {
      return res.json(foods);
    }
  }

  return res.json({ message: "Food Information not found " });
};
