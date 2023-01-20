import { AsyncThunk, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ApiError } from "../../util/errorHandler";
import { Person, ServerPerson } from "../../model/Person";
import store, { RootState, useAppDispatch, useAppSelector } from "../../store";
import peopleSlice, { fetchedPeopleFail, fetchedPeopleSuccess, fetchingPeople } from "../reducers/peopleSlice";
import { ApplicationState } from "../rootReducer";


const parseServerPersonToPerson = (serverPerson: ServerPerson): Person => {
    let person: Person = {
        id: serverPerson.id,
        fullName: serverPerson.name,
        email: serverPerson.email,
        username: serverPerson.email,
        address: {
            street: serverPerson.address.street,
            suite: serverPerson.address.suite,
            city: serverPerson.address.city,
            zipCode: serverPerson.address.zipcode,
            geoLocation: {
                lat: serverPerson.address.geo.lat,
                lon: serverPerson.address.geo.lng,
            },
        },
        phone: serverPerson.phone,
        website: serverPerson.website,
        companyName: serverPerson.company.name,
    };
    return person;
}

const parseServerPeopleToPeople = (serverPeople: ServerPerson[]): Person[] => {
    let people: Person[] = serverPeople.map(serverPerson => {
        return parseServerPersonToPerson(serverPerson)
    });
    return people;
}

export const handleFetchPeople = async (dispatch: any, getState: RootState) => {
        dispatch(fetchingPeople());
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        if (response.status != 200) {
            return dispatch(fetchedPeopleFail({ message: 'Failed to load user data. Please try again.'} as ApiError));
        } else {
            const serverPeople: ServerPerson[] = await response.json() as ServerPerson[];

            // Parsing json object from API call to local Person array JS object format below:
            const people: Person[] = parseServerPeopleToPeople(serverPeople) as Person[];
            return dispatch(fetchedPeopleSuccess(people));
        }
}

// const handleFetchPeople = createAsyncThunk<
//     ServerPerson[],
//     null,
//     {
//         rejectValue: ApiError
//     }>('/users', async (thunkApi) => {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
//             method: 'GET',
//             // headers: {
//             //     'Authorization': 'noAuth'
//             // },
//         })
//         if (response.status === 400) {
//             return thunkApi.rejectWithValue((await response.json()) as ApiError);
//         } else {
//             const serverPeople: ServerPerson[] = await response.json() as ServerPerson[];

//             // Parsing json object from API call to local Person array JS object format below:
//             return parseServerPeopleToPeople(serverPeople) as Person[];
//         }
//     }
// )