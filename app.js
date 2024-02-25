import express from "express";
import mongoose from "mongoose";
import router from "./Routes/Routes.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(express.json());
app.use("/api", router);

mongoose.connect(process.env.DB_URL
).then(() => app.listen(3600)
).then(() => console.log("Connected to Database and Listens from: 3600")).catch((err) => console.log(err));

