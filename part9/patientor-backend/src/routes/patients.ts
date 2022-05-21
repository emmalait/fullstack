import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/patientUtils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsWithoutSensitiveData());
});

/*
name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
*/

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong. ";
    if (error instanceof Error) {
      errorMsg += "Error: " + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

export default router;
