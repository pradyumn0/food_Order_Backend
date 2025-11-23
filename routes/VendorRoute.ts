import express, {Request, Response, NextFunction} from "express"
import { VandorLogin } from "../controller"

const router = express.Router()

router.post("/login",VandorLogin)

router.get('/',(req:Request,res:Response,next :NextFunction)=>{
  res.json({message: "Hello From Vender"})
})




export {router as VendorRoute}