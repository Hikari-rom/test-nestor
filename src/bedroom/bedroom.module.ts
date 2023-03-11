import { Module } from "@nestjs/common";
import { BedroomController } from "./bedroom.controller";
import { BedroomService } from "./bedroom.service";

@Module({
    imports: [],
    controllers: [BedroomController],
    providers: [BedroomService],
})
export class BedroomModule { }