import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createBedroomDto {
    @IsString()
    @ApiProperty()
    description: string;
    @IsNumber()
    @ApiProperty()
    size: number;
    @IsNumber()
    @ApiProperty()
    numberOfBeds: number;
    @IsNumber()
    @ApiProperty()
    apartment_id: number;
}