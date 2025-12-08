import express, { Request,Response,NextFunction} from "express"
import { CreateVandor, GetVandor, GetVandorByID } from "../controller"

const router = express.Router()

router.post("/signup",CreateVandor)
router.post("/login",GetVandor)



router.patch("/verify",GetVandorByID)
router.get("/otp",GetVandorByID)
router.get("/profile",GetVandorByID)
router.patch("/profile",GetVandorByID)


router.get('/',(req:Request,res:Response,next :NextFunction)=>{
  res.json({message: "Hello From Customer"})
})

export  {router as CustomerRoute}