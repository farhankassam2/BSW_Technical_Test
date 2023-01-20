import { Person, ServerPerson } from "../model/Person";
import { ApiError } from "./errorHandler";
import Toast from 'react-native-simple-toast';


class Helpers {
    static parseServerPersonToPerson (serverPerson: ServerPerson): Person {
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

    static notifyUserError(error: ApiError) {
        Toast.show(error.message, Toast.LONG);
    }
}

export default Helpers;