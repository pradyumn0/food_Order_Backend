import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || "Your MONGO URI here";
export const APP_SECRET = " your_app_secret"

export const PORT = process.env.PORT || 8000