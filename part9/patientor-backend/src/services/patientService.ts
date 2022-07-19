import patientData from "../../data/patients";
import { Patient, PublicPatient, NewPatient } from "../types";
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const id = uuid();
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsWithoutSensitiveData,
  getPatient,
  addPatient,
};
