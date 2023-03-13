
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;
    @Column()
    @IsString()
    email: string;
    @Column()
    @IsString()
    first_name: string;
    @Column()
    @IsString()
    last_name: string;
    @Column()
    @IsString()
    address: string;
    @Column()
    @IsString()
    zipcode: string;
    @Column()
    @IsString()
    city: string;
    @Column()
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