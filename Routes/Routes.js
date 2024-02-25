import express from "express";
import { registerNewPatient, logInPatient, forgotPassword, getAllPatients  } from "../Controllers/patient_controllers.js";
import { getAllSpecialists, logInSpecialist, registerNewSpecialist } from "../Controllers/specialist_controller.js";

const router = express.Router();

//Routes for handling patients
router.get("/users/viewpatients", getAllPatients);
router.post("/users/register/patient", registerNewPatient);
router.post("/auth/login/patient", logInPatient);
router.post("/auth/forgotPassword", forgotPassword);

//Routes for handling specialists
router.get("/users/viewspecialist", getAllSpecialists);
router.post("/users/register/specialist", registerNewSpecialist);
router.post("/auth/login/specialist", logInSpecialist);
router.post("/auth/forgotPassword", forgotPassword);

export default router;

