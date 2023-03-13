import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from "class-validator";
import { Apartment } from '../apartment/apartment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Apartment, (apartment) => apartment.owner)
    apartments: Apartment[];
}