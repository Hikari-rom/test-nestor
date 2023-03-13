import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { ApartmentController } from "./apartment.controller";
import { Apartment } from "./apartment.entity";
import { ApartmentService } from "./apartment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Apartment]), UserModule],
    controllers: [ApartmentController],
    providers: [ApartmentService]
})
export class ApartmentModule { }