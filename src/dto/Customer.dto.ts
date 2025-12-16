import { IsEmail, Length } from "class-validator";

export class CreateCustomerInput{
  @IsEmail()
  email: string;

  @Length(7,12)
  phone: string;

  @Length(6,12)
  password: string;

}

export class UserLoginInputs{
  @IsEmail()
  email: string;

  @Length(6,12)
  password: string;

}

export interface CustomerPayLoad{
  _id: string;
  email: string;
  verified: boolean;
}


export class EditCustomerProfileInputs{
  @Length(3,16)
  firstName: string;

  @Length(3,16)
  lastName: string;

  @Length(3,16)
address: string;
}


export class OrderInputs{
  _id: string;

  unit: number;
}
