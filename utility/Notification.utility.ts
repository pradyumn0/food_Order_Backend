export const GenerateOtp = ()=>{


  const otp = Math.floor(100000 + Math.random()* 900000)

  let expiry = new Date()
  expiry.setTime(new Date().getTime()+ (30+60+1000))

  return {otp, expiry}
}


export const onRequestOTP = async (otp:number, toPhoneNumber: string)=>{

 const accountSid = process.env.ACCOUNTSID;
 const authToken = process.env.TWILLO_AUTHTOKEN;
 const client = require('twilio')(accountSid , authToken)

 const response = await client.message.create({
body: `Your OTP is ${otp}`,
from: '+91777387029',
to: `+91${toPhoneNumber}`,
 })

 return response
}
