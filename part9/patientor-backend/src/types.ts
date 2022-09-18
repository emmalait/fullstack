export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum EntryType {
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
  HealthCheck = "HealthCheck",
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

export type NewPatient = Omit<Patient, "id">;

export type NewEntry =
  | NewOccupationalHealthcareEntry
  | NewHospitalEntry
  | NewHealthCheckEntry;

export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  "id"
>;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
