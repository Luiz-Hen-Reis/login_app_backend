import express from "express";
import { config } from "dotenv";
import { sequelize } from "./database";
import { router } from "./router";

config();

const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.SERVERPORT || 5000;

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("db connection successfull");
  });
  console.log(`Server started successfuly at port ${PORT}`);
});
