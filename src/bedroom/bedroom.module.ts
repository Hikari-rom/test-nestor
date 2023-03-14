import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "../booking/booking.entity";
import { Apartment } from "../apartment/apartment.entity";
import { ApartmentModule } from "../apartment/apartment.module";
import { BedroomController } from "./bedroom.controller";
import { Bedroom } from "./bedroom.entity";
import { BedroomService } from "./bedroom.service";

@Module({
    imports: [TypeOrmModule.forFeature([Bedroom, Apartment, Booking]), ApartmentModule],
    controllers: [BedroomController],
    providers: [BedroomService],
    exports: [BedroomService]
})
export class BedroomModule { }