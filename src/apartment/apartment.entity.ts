import { User } from "src/user/user.entity";

export class Apartment {
    id: number;
    address: string;
    city: string;
    zipcode: string;
    owner: User;
}