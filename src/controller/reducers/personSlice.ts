import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../model/Person";
import { ApiError } from "../../util/errorHandler";
import { PersonState } from "../types";

const initialState: PersonState = {
    person: undefined, // undefined if user is not viewing a person's details

    gettingPerson: false,
    gettingPersonError: undefined,
}

export const personSlice = createSlice({
    name: 'personReducer',
    initialState,
    reducers: {
        fetchingPerson: (state) => {
            return {
                ...state,
                gettingPerson: true,
                gettingPersonError: undefined,
            }
        },
        fetchedPersonSuccess: (state, action: PayloadAction<Person>) => {
            return {
                ...state,
                gettingPerson: false,
                gettingPersonError: undefined,
                person: action.payload,
            }
        },
        fetchingPersonFail: (state, action: PayloadAction<ApiError>) => {
            return {
                ...state,
                gettingPerson: false,
                gettingPersonError: action.payload,
            }
        },
        default: (state) => state,
    }
})

// Redux dispatchable actions
export const { fetchingPerson, fetchedPersonSuccess, fetchingPersonFail } = personSlice.actions;

export default personSlice.reducer;