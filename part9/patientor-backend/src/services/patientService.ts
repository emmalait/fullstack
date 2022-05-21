import patientData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsWithoutSensitiveData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
  addPatient,
};
