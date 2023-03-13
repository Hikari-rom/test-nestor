import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { UserModule } from "../user/user.module";
import { ApartmentController } from "./apartment.controller";
import { Apartment } from "./apartment.entity";
import { ApartmentService } from "./apartment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Apartment, User]), UserModule],
    controllers: [ApartmentController],
    providers: [ApartmentService],
    exports: [ApartmentService]
})
export class ApartmentModule { }