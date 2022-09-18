import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: { patientId: string; entry: Entry };
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "ADD_ENTRY":
      if (state.patient?.id === action.payload.patientId) {
        return {
          ...state,
          patient: {
            ...state.patient,
            entries: [...state.patient.entries, action.payload.entry],
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};
