import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";
import { User } from "../user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Apartment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    @IsNumber()
    id: number;

    @Column()
    @ApiProperty()
    @IsString()
    address: string;

    @Column()
    @ApiProperty()
    @IsString()
    city: string;

    @Column()
    @ApiProperty()
    @IsString()
    zipcode: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.apartments, { eager: true })
    owner: User;
}