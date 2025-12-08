import Express,{ Application } from "express";
import { VendorRoute,AdminRoute,ShoppingRoute, CustomerRoute } from "../routes";
import bodyParser from 'body-parser'
import path from 'path'
// import { ShoppingRoute } from "../routes/ShppingRoute";


export default async(app: Express.Application)=>{

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/images', Express.static(path.join(__dirname,'images')))

app.use('/admin', AdminRoute)
app.use('/vandor',VendorRoute)
app.use('/customer',CustomerRoute)
app.use('/shopping',ShoppingRoute)
return app

// app.use('/',(req,res)=>{
// return res.json("Hello From Food Order Backend!!! ")
// })


}