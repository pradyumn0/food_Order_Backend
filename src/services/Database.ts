import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async () => {
  try {
    mongoose.connect(MONGO_URI).then((res) => console.log("DB Connected"));
  } catch (error) {
    console.log(error);
  }
};
