import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import { setPatient } from "../state/actions";

const PatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (id) {
      void axios.get<void>(`${apiBaseUrl}/ping`);

      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  }, [dispatch, id]);

  const getDiagnosis = (diagnoses: Diagnosis[], code: string) => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
    return diagnosis ? (
      <span>
        {diagnosis.code}: {diagnosis?.name}
      </span>
    ) : null;
  };

  return (
    <div>
      <h1>{patient?.name}</h1>
      <p>
        ssn: {patient?.ssn}
        <br />
        gender: {patient?.gender}
        <br />
        occupation: {patient?.occupation}
      </p>
      {patient?.entries && patient.entries.length > 0 && (
        <>
          <h2>entries</h2>
          {patient?.entries.map((entry) => {
            return (
              <div key={entry.id}>
                <span>
                  {entry.date}: <i>{entry.description}</i>
                </span>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <ul>
                    {entry.diagnosisCodes.map((diagnosisCode, index) => (
                      <li key={index}>
                        {getDiagnosis(diagnoses, diagnosisCode)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PatientPage;
