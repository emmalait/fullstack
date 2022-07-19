export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
  test: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}
