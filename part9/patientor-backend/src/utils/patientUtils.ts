import { Gender, NewPatient } from "../types";
import { parseString, parseDate } from "./utils";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries?: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, "name"),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, "ssn"),
    gender: parseGender(gender),
    occupation: parseString(occupation, "occupation"),
    entries: entries ? parseEntries(entries) : [],
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseEntries = (_entries: unknown): [] => {
  return [];
};
