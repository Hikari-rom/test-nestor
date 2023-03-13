import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
    @IsString()
    @ApiProperty()
    first_name: string;
    @IsString()
    @ApiProperty()
    last_name: string;
    @IsString()
    @ApiProperty()
    email: string;
    @IsString()
    @ApiProperty()
    address: string;
    @IsString()
    @ApiProperty()
    zipcode: string;
    @IsString()
    @ApiProperty()
    city: string;
    @IsString()
    @ApiProperty()
    country: string;
}