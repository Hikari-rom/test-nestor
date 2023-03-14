import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Apartment } from "../apartment/apartment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../booking/booking.entity";

@Entity()
export class Bedroom {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Column()
    @IsNumber()
    size: number;

    @ApiProperty()
    @Column()
    @IsString()
    description: string;

    @ApiProperty()
    @Column()
    @IsNumber()
    numberOfBeds: number;

    @ApiProperty({ type: () => Apartment })
    @ManyToOne(() => Apartment, (apartment) => apartment.bedrooms, { eager: true })
    apartment: Apartment;

    @OneToMany(() => Booking, (booking) => booking.bedroom)
    bookings: Booking[];
}