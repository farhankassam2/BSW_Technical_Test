import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Person } from "../../model/Person";
import { PeopleState } from "../types";
import { ApiError } from "../../util/errorHandler";


const initialState: PeopleState = {
    people: [],

    gettingPeople: false,
    gettingPeopleError: undefined,
}

// Redux reducer for PeopleListView component -- with added dispatch example actions for future use.
export const peopleSlice = createSlice({
    name: 'peopleReducer',
    initialState,
    reducers: {
        fetchingPeople: (state) => {
            return {
                ...state,
                gettingPeople: true,
            }
        },
        fetchedPeopleSuccess: (state, action: PayloadAction<Person[]>) => {
            return {
                ...state,
                gettingPeople: false,
                people: action.payload,
            }
        },
        fetchedPeopleFail: (state, action: PayloadAction<ApiError>) => {
            return {
                ...state,
                gettingPeople: false,
                gettingPeopleError: action.payload,
            }
        },
        default: (state) => state,
        // Examples not used in application but could be used in the future.
        // updatePerson: (state, action: PayloadAction<Person>) => {
        //     state.people = state.people.map(person => {
        //         if (person.id == action.payload.id) {
        //             return action.payload;
        //         } else return person;
        //     });
        // },
        // addPerson: (state, action: PayloadAction<Person>) => {
        //     state.people = [...state.people, action.payload];
        // },
        // removePerson: (state, action: PayloadAction<number>) => {
        //     state.people.filter(person => person.id != action.payload);
        // },
    }
})

// Redux dispatchable actions
export const { fetchingPeople, fetchedPeopleSuccess, fetchedPeopleFail } = peopleSlice.actions;

export default peopleSlice.reducer;