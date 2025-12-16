import express, { Request, Response, NextFunction } from "express";
import { CreateVandor, GetVandor, GetVandorByID } from "../controller";
import {
  CreateOrder,
  CustomerLogin,
  CustomerSignup,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  GetOrderById,
  GetOrders,
  RequestOtp,
} from "../controller/Customer.controller";
import { Authenticate } from "../middleware";

const router = express.Router();

router.post("/signup", CustomerSignup);
router.post("/login", CustomerLogin);

router.use(Authenticate);

router.patch("/verify", CustomerVerify);
router.get("/otp", RequestOtp);
router.get("/profile", GetCustomerProfile);
router.patch("/profile", EditCustomerProfile);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello From Customer" });
});



// Order

router.post("/create-order",CreateOrder)
router.get("/orders",GetOrders)
router.get("/order/:id",GetOrderById)


export { router as CustomerRoute };
