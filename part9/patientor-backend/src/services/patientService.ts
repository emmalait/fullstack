import patientData from "../../data/patients";
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsWithoutSensitiveData = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | null => {
  const patient = patients.find((p) => p.id === id);
  return patient ? patient : null;
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };
  // Find correct patient and push to that patient's entries
  patients.find((patient) => patient.id === patientId)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsWithoutSensitiveData,
  getPatient,
  addPatient,
  addEntry,
};
