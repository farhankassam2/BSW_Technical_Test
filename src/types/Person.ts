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