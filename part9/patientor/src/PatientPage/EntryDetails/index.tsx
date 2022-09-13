import React from "react";

import {
  assertNever,
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStateValue } from "../../state";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  switch (entry.type) {
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryComponent
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case "Hospital":
      return <HospitalEntryComponent entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const OccupationalHealthcareEntryComponent: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <BasicEntry key={entry.id}>
      <MedicalServicesIcon />
      <BasicInfo entry={entry} diagnoses={diagnoses} />
      <p>
        Employer: {entry.employerName}
        <br />
        {entry.sickLeave && (
          <span>
            Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </span>
        )}
      </p>
    </BasicEntry>
  );
};

const HospitalEntryComponent: React.FC<{
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <BasicEntry key={entry.id}>
      <LocalHospitalIcon />
      <BasicInfo entry={entry} diagnoses={diagnoses} />
      {entry.discharge && (
        <div>
          Discharge:
          <ul>
            <li>Date: {entry.discharge.date}</li>
            <li>Criteria: {entry.discharge.criteria}</li>
          </ul>
        </div>
      )}
    </BasicEntry>
  );
};

const HealthCheckEntryComponent: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <BasicEntry key={entry.id}>
      <AssignmentTurnedInIcon />
      <BasicInfo entry={entry} diagnoses={diagnoses} />
      {entry.healthCheckRating !== undefined && (
        <HealthCheckRatingComponent rating={entry.healthCheckRating} />
      )}
    </BasicEntry>
  );
};

const HealthCheckRatingComponent: React.FC<{ rating: HealthCheckRating }> = ({
  rating,
}) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon htmlColor="#3BFF33" />;
    case 1:
      return <FavoriteIcon htmlColor="#FFD433" />;
    case 2:
      return <FavoriteIcon htmlColor="#FF8C33" />;
    case 3:
      return <FavoriteIcon htmlColor="#FF3333" />;
    default:
      return <FavoriteIcon htmlColor="#D2D7D2" />;
  }
};

const BasicEntry: React.FC = (props) => {
  return (
    <div
      style={{
        border: "2px dashed grey",
        borderRadius: "15px",
        padding: "10px",
        margin: "5px",
      }}
    >
      {props.children}
    </div>
  );
};

const BasicInfo: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  return (
    <>
      <p>
        Date: {entry.date}
        <br />
        Description: <i>{entry.description}</i>
        <br />
        Specialist: {entry.specialist}
      </p>
      {entry.diagnosisCodes && (
        <Diagnoses
          diagnosisCodes={entry.diagnosisCodes}
          diagnoses={diagnoses}
        />
      )}
    </>
  );
};

const Diagnoses: React.FC<{
  diagnosisCodes: string[];
  diagnoses: Diagnosis[];
}> = ({ diagnosisCodes, diagnoses }) => {
  const getText = (code: string) => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
    return diagnosis ? (
      <span>
        {diagnosis.code}: {diagnosis?.name}
      </span>
    ) : null;
  };

  return (
    <>
      <p>Diagnoses:</p>
      <ul>
        {diagnosisCodes.map((diagnosisCode, index) => (
          <li key={index}>{getText(diagnosisCode)}</li>
        ))}
      </ul>
    </>
  );
};

export default EntryDetails;
