export type Address = {
    street: string;
    suite: string;
    city: string;
    zipCode: string;
    geoLocation: {
        lat: string;
        lon: string;
    }
}