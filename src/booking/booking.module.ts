import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apartment } from "../apartment/apartment.entity";
import { BedroomModule } from "../bedroom/bedroom.module";
import { User } from "../user/user.entity";
import { UserModule } from "../user/user.module";
import { BookingController } from "./booking.controller";
import { Booking } from "./booking.entity";
import { BookingService } from "./booking.service";

@Module({
    imports: [UserModule, BedroomModule, TypeOrmModule.forFeature([Booking, User, Apartment])],
    controllers: [BookingController],
    providers: [BookingService]
})
export class BookingModule { }