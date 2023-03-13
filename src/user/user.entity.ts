import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    @IsNumber()
    id: number;
    @Column()
    @ApiProperty()
    @IsString()
    email: string;
    @Column()
    @ApiProperty()
    @IsString()
    password: string;
    @Column()
    @ApiProperty()
    @IsString()
    first_name: string;
    @Column()
    @ApiProperty()
    @IsString()
    last_name: string;
    @Column()
    @ApiProperty()
    @IsString()
    address: string;
    @Column()
    @ApiProperty()
    @IsString()
    zipcode: string;
    @Column()
    @ApiProperty()
    @IsString()
    city: string;
    @Column()
    @ApiProperty()
    @IsString()
    country: string;

    // constructor(id: number, first_name: string, last_name: string, address: string, zipcode: string, city: string, country: string) {
    //     this.id = id;
    //     this.first_name = first_name;
    //     this.last_name = last_name;
    //     this.address = address;
    //     this.zipcode = zipcode;
    //     this.city = city;
    //     this.country = country;
    // }
}