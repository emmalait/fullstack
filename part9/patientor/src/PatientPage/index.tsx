import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry, Gender, Patient } from "../types";
import { setPatient } from "../state/actions";
import { addEntry } from "../state/actions";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import { Button } from "@material-ui/core";
import AddEntryModal from "./AddEntryModal";
import { EntryFormValues } from "./AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    if (id) {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addEntry({ patientId: id, entry: newEntry }));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(
            String(e?.response?.data?.error) || "Unrecognized axios error"
          );
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };

  return (
    <div>
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
      </div>
      <div>
        <h2>entries</h2>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add new entry
        </Button>
        {patient?.entries &&
          patient?.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
      </div>
    </div>
  );
};

export default PatientPage;
