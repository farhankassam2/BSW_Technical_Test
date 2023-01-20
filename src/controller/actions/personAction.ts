import { Person, ServerPerson } from "../../model/Person";
import { RootState } from "../../store";
import { ApiError } from "../../util/errorHandler";
import Helpers from "../../util/helpers";
import { fetchedPersonSuccess, fetchingPerson, fetchingPersonFail } from "../reducers/personSlice";

// Purpose: to fetch an individual person's data via a query string parameter, given a personId.
//          to dispatch fetching person during API call load, and the details of the requested person to the personSlice of the reducer to process and deliver to the PersonView component.
//           to handle any non-200 status errors with a generic user message delivered to the PersonView component as well.
export const handleFetchPerson = (personId:number) => async (dispatch: any, getState: RootState ) => {
    dispatch(fetchingPerson());

    const response = await fetch(`https://jsonplaceholder.typicode.com/users?id=${personId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
    });

    if (response.status !== 200) {
        return dispatch(fetchingPersonFail({ message: 'Failed to load user data. Please try again.'} as ApiError));
    }

    const serverPerson: ServerPerson = (await response.json())['0'] as ServerPerson;
    const person: Person = Helpers.parseServerPersonToPerson(serverPerson);
    return dispatch(fetchedPersonSuccess(person));
}