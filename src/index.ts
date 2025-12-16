import express from "express";
import App from "./services/ExpressApp";
import dbConnection from "./services/Database";
import { PORT } from "./config";

const StarServer = async () => {
  const app = express();
  await dbConnection();
  await App(app);

  app.listen(PORT, () => {
    console.clear();
    console.log(`App is listening to port ${PORT}`);
  });
};
StarServer();
