// data transfre object 
export interface CreateVandorInput{
  name:string;
  ownerName:string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface EditVandorInputs{
  name?:string;
  foodType?: [string];
  address?: string;
  phone?: string;
  
}

export interface VandorLoginInput{
  email:string;
  password:string;
}

export interface VandorPayload {
  _id:string | number;
  email:string;
  name:string;
  foodType: [string];

}