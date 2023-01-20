import { Person } from "../model/Person";
import { ApiError } from "../util/errorHandler";

// PEOPLE STATE TYPES
// export enum PeopleActionType {
//     GET_PEOPLE_START = 'GET_PEOPLE_START',
//     GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS',
//     GET_PEOPLE_FAIL = 'GET_PEOPLE_FAIL',
// }

export type PeopleState = {
    people: Person[];
    
    gettingPeople: boolean;
    gettingPeopleError?: ApiError;
}

// export type PeopleAction = {
//     type: PeopleActionType,
//     payload: Person[] | ApiError,
// }

//PERSON STATE TYPES

// export enum PersonActionType {
//     GET_PERSON_START = 'GET_PERSON_START',
//     GET_PERSON_SUCCESS = 'GET_PERSON_SUCCESS',
//     GET_PERSON_FAIL = 'GET_PERSON_FAIL',
// }
export type PersonState = {
    person?: Person;
    
    gettingPerson: boolean;
    gettingPersonError?: ApiError;
}


// export type PersonAction = {
//     type: PersonActionType,
//     payload: Person | ApiError,
// }
