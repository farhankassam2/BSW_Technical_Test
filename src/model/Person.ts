import { Address } from "./Address";

export type Person = {
    id: number;
    fullName: string;
    email: string;
    username: string;
    address: Address;
    phone: string;
    website: string;
    companyName: string;
}

export type ServerPerson = {
    id: number;
    name: string;
    email: string;
    username: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    },
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
};