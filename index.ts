import Express = require("express")
import { VendorRoute,AdminRoute } from "./routes";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import { MONGO_URI } from "./config";
import path from 'path'


const app = Express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/images', Express.static(path.join(__dirname,'images')))

app.use('/admin', AdminRoute)
app.use('/vandor',VendorRoute)


mongoose.connect(MONGO_URI).then(res => console.log("DB Connected"))

// app.use('/',(req,res)=>{
// return res.json("Hello From Food Order Backend!!! ")
// })

app.listen(8000,()=>{
  console.clear();
  console.log("App is listening to port 8000");
})