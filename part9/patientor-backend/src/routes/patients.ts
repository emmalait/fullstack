import express from "express";
import patientService from "../services/patientService";
import { toNewEntry } from "../utils/entryUtils";
import { toNewPatient } from "../utils/patientUtils";

const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatient(id));
});

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsWithoutSensitiveData());
});

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

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong. ";
    if (error instanceof Error) {
      errorMsg += "Error: " + error.message;
    }
    res.status(400).send(errorMsg);
  }
});

export default router;
