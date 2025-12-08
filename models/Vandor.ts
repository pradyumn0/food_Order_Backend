  import mongoose from "mongoose";

  interface VandorDoc extends mongoose.Document{
    name:string;
    ownerName:string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    serviceAvailable:boolean;
    salt:string;
    coverImages:[string];
    rating:number;
    foods:any
  }

  const VandorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    ownerName:{type:String,required:true},
    foodType:{type:[String],required:true},
    pincode:{type:String,required:true},
    address:{type:String},  
    phone:{type:String,required:true},
    salt:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    serviceAvailable:{type:Boolean,default:false},
    coverImages:{type:String},
    rating:{type:Number,default:0},
    foods:[{type:mongoose.Schema.Types.ObjectId,ref:"Food"}]
  },{
    toJSON: {
      transform(doc,ret) {
      //  delete ret.password;
      }

    },
    timestamps:true
  });

  const Vandor = mongoose.model<VandorDoc>("Vandor",VandorSchema);

  export default Vandor;

