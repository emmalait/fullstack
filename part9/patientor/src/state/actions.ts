import { Patient, Diagnosis } from "../types";
import { Action } from "./reducer";

export const setPatientList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};

export const setPatient = (patient: Patient): Action => {
  return { type: "SET_PATIENT", payload: patient };
};

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", payload: diagnoses };
};
