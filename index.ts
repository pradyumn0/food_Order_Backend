import express from 'express'
import App from './services/ExpressApp'
import dbConnection from './services/Database'

const StarServer = async ()=>{
  const app = express()
  await dbConnection()
  await App(app)

app.listen(8000,()=>{
  console.clear();
  console.log("App is listening to port 8000");
})

}
StarServer()