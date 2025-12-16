  import mongoose from "mongoose";
import { OrderDoc } from "./Order";

  interface CustomerDoc extends mongoose.Document{
    email:string;
    password: string;
    salt:string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    verified: boolean;
    otp:number;
    otp_expiry: Date;
    lat: number;
    lng: number;
    orders: [OrderDoc]
  }

  const CustomerSchema = new mongoose.Schema({
    email:{type: String ,required: true},
    password: {type: String ,required: true},
    salt:{type: String ,required: true},
    firstName: {Type: String},
    lastName: {Type: String},
    address: {Type: String},
    phone: {Type: String ,required: true},
    verified: {Type: Boolean ,required: true},
    otp:{Type: Number ,required: true},
    otp_expiry: {Type: Date ,required: true},
    lat: {Type: Number},
    lng: {Type: Number},
    orders:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Order"
    }]
  },{
    toJSON: {
      transform(doc,ret) {
      //  delete ret.password;
      }

    },
    timestamps:true
  });

  const Customer = mongoose.model<CustomerDoc>("Customer",CustomerSchema);

  export default Customer;

