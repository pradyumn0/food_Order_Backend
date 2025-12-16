import express, { Request, Response, NextFunction } from "express";
import { CreateVandor, GetVandor, GetVandorByID } from "../controller";

const router = express.Router();

router.post("/vandor", CreateVandor);
router.get("/vandor", GetVandor);
router.get("/vandor:id", GetVandorByID);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello From Admin" });
});

export { router as AdminRoute };
