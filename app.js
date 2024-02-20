import express from "express";
import mongoose from "mongoose";
import router from "./Routes/Routes.js";


const app = express();
app.use(express.json());
app.use("/api", router);

mongoose.connect("<ACTUAL_DATABASE_LINK>"
).then(() => app.listen(3600)
).then(() => console.log("Connected to Database and Listens from: 3600")).catch((err) => console.log(err));

