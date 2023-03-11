import { Bedroom } from "src/bedroom/bedroom.entity";
import { User } from "src/user/user.entity";

export class Booking {
    id: number;
    bedroom: Bedroom;
    user: User;
    startDate: Date;
    endDate: Date;
}