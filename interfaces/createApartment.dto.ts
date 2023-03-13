import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createApartmentDto {
    @IsString()
    @ApiProperty()
    address: string;
    @IsString()
    @ApiProperty()
    city: string;
    @IsString()
    @ApiProperty()
    zipcode: string;
    @IsNumber()
    @ApiProperty()
    owner_id: number;
}