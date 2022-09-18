import {
  Discharge,
  EntryType,
  HealthCheckRating,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
} from "../types";
import { parseString, parseDate, isDate, isString } from "./utils";

type Fields = {
  type: string;
  description: string;
  date: string;
  specialist: string;
  employerName?: string;
  discharge?: Discharge;
  healthCheckRating?: HealthCheckRating;
};

export const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  employerName,
  discharge,
  healthCheckRating,
}: Fields): NewEntry => {
  const entryType: EntryType = parseEntryType(type);
  switch (entryType) {
    case EntryType.OccupationalHealthcare:
      const newOccupationalEntry: NewOccupationalHealthcareEntry = {
        type: entryType,
        description: parseString(description, "description"),
        date: parseDate(date),
        specialist: parseString(specialist, "specialist"),
        employerName: parseString(employerName, "employerName"),
      };
      return newOccupationalEntry;
    case EntryType.Hospital:
      const newHospitalEntry: NewHospitalEntry = {
        type: entryType,
        description: parseString(description, "description"),
        date: parseDate(date),
        specialist: parseString(specialist, "specialist"),
        discharge: parseDischarge(discharge),
      };
      return newHospitalEntry;
    case EntryType.HealthCheck:
      const newEntry: NewHealthCheckEntry = {
        type: entryType,
        description: parseString(description, "description"),
        date: parseDate(date),
        specialist: parseString(specialist, "specialist"),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      return newEntry;
  }
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isEntryTpe(entryType)) {
    throw new Error("Incorrect or missing entryType: " + entryType);
  }
  return entryType;
};

const isEntryTpe = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge: " + discharge);
  }
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return isDate(param.date) && isString(param.criteria);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};
