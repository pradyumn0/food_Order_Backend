import express, {Request, Response, NextFunction} from "express"
import { GetVandorProfile, UpdateVandorProfile, VandorLogin } from "../controller"

const router = express.Router()

router.post("/login",VandorLogin)
router.get("/profile",GetVandorProfile)
router.patch("/profile",UpdateVandorProfile)
router.patch("/service")


router.get('/',(req:Request,res:Response,next :NextFunction)=>{
  res.json({message: "Hello From Vender"})
})




export {router as VendorRoute}