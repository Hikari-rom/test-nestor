import { IsString } from "class-validator";

export class createUserDto {
    @IsString()
    first_name: string;
    @IsString()
    last_name: string;
    @IsString()
    email: string;
    @IsString()
    address: string;
    @IsString()
    zipcode: string;
    @IsString()
    city: string;
    @IsString()
    country: string;
}