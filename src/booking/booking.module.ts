import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BedroomModule } from "src/bedroom/bedroom.module";
import { UserModule } from "src/user/user.module";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";

@Module({
    imports: [UserModule, BedroomModule, TypeOrmModule.forFeature([BedroomModule])],
    controllers: [BookingController],
    providers: [BookingService]
})
export class BookingModule { }