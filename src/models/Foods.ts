import mongoose from "mongoose";

export interface FoodDoc extends mongoose.Document {
  vandorId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: [string];
}

const FoodSchema = new mongoose.Schema({
   vandorId: {type:String},
  name: {type:String,required:true},
  description: {type:String, required:true},
  category: {type:String },
  foodType: {type:String , required:true},
  readyTime: {type:Number},
  price: {type:Number , required:true},
  rating: {type:Number},
  images: {type:[String]}
}, { timestamps: true })

export const Food = mongoose.model<FoodDoc>('Food',FoodSchema)