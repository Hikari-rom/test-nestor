import { IsDateString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createBookingDto {
    @IsDateString()
    @ApiProperty()
    start_date: Date;

    @IsDateString()
    @ApiProperty()
    end_date: Date;

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNumber()
    @ApiProperty()
    user_id: number;

    @IsNumber()
    @ApiProperty()
    bedroom_id: number;
}