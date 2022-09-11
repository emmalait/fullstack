import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";
import { setPatient } from "../state/actions";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();

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

  return (
    <div>
      <h1>
        {patient?.name} {patient?.gender === Gender.Male && <MaleIcon />}
        {patient?.gender === Gender.Female && <FemaleIcon />}
      </h1>
      <p>
        ssn: {patient?.ssn}
        <br />
        occupation: {patient?.occupation}
      </p>
      {patient?.entries && patient.entries.length > 0 && (
        <div>
          <h2>entries</h2>
          {patient?.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPage;
