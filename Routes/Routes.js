import express from "express";
import { getAllUsers, registerNewPatient, logIn, forgotPassword  } from "../Controllers/Controllers.js";

const router = express.Router();

router.get("/users/view", getAllUsers);
router.post("/users/create", registerNewPatient);
router.post("/auth/login", logIn);
router.post("/auth/forgotPassword", forgotPassword);

export default router;

