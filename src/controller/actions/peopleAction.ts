import { AsyncThunk, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ApiError } from "../../util/errorHandler";
import { Person, ServerPerson } from "../../model/Person";
import store, { RootState, useAppDispatch, useAppSelector } from "../../store";
import peopleSlice, { fetchedPeopleFail, fetchedPeopleSuccess, fetchingPeople } from "../reducers/peopleSlice";
import { ApplicationState } from "../rootReducer";
import Helpers from "../../util/helpers";




const parseServerPeopleToPeople = (serverPeople: ServerPerson[]): Person[] => {
    let people: Person[] = serverPeople.map(serverPerson => {
        return Helpers.parseServerPersonToPerson(serverPerson)
    });
    return people;
}

// Purpose: to fetch data of all the users from the API call, using the 'users' route in the URL.
//          to dispatch fetching people during API call load, and people list to the peopleSlice of the reducer to process and deliver to the PersonListView component.
//           to handle any non-200 status errors with a generic user message delivered to the PersonListView component as well.
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
        }
        const serverPeople: ServerPerson[] = await response.json() as ServerPerson[];

        // Parsing json object from API call to local Person array JS object format below:
        const people: Person[] = parseServerPeopleToPeople(serverPeople) as Person[];
        return dispatch(fetchedPeopleSuccess(people));
}

//  Below code does not work that was tried initially, therefore left commented out.
//const handleFetchPeople = createAsyncThunk<
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