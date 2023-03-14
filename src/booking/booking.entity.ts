import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";
import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bedroom } from "../bedroom/bedroom.entity";
import { User } from "../user/user.entity";

export class Booking {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: () => Bedroom })
    @ManyToOne(() => Bedroom, (bedroom) => bedroom.bookings, { eager: true })
    bedroom: Bedroom;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.bookings, { eager: true })
    user: User;

    @IsDate()
    @ApiProperty()
    date: Date;

    @IsNumber()
    @ApiProperty()
    price: number;
}