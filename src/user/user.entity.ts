
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    email: string;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    address: string;
    @Column()
    zipcode: string;
    @Column()
    city: string;
    @Column()
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