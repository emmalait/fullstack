import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { setPatient } from "../state/actions";

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
      <h1>{patient?.name}</h1>
      <p>
        ssn: {patient?.ssn}
        <br />
        gender: {patient?.gender}
        <br />
        occupation: {patient?.occupation}
      </p>
    </div>
  );
};

export default PatientPage;
