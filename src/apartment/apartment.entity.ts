import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { User } from "../user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bedroom } from "../bedroom/bedroom.entity";

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

    @OneToMany(() => Bedroom, (bedroom) => bedroom.apartment)
    bedrooms: Bedroom[];
}