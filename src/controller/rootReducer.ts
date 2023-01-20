import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import peopleSlice from "./reducers/peopleSlice";
import personSlice from "./reducers/personSlice";
import { PeopleState, PersonState } from "./types";

export interface ApplicationState {
    peopleState: PeopleState,
    personState: PersonState,
}

export interface ApplicationReducer {
    people: Reducer<PeopleState, AnyAction>,
    person: Reducer<PersonState, AnyAction>,
}

export const reducers: ApplicationReducer = {
    people: peopleSlice,
    person: personSlice,
};