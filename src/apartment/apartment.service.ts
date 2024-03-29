import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createApartmentDto } from "../../interfaces/createApartment.dto";
import { UserService } from "../user/user.service";
import { DeleteResult, Repository } from "typeorm";
import { Apartment } from "./apartment.entity";

@Injectable()
export class ApartmentService {
    @Inject(UserService)
    private userService: UserService;

    constructor(
        @InjectRepository(Apartment)
        private apartmentRepository: Repository<Apartment>,
    ) { }

    async findAll(): Promise<Apartment[]> {
        return await this.apartmentRepository.find();
    }

    async findOneById(id: number): Promise<Apartment> {
        return await this.apartmentRepository.findOneBy({ id: id });
    }

    async create(partialApartment: createApartmentDto): Promise<Apartment> {
        const user = await this.userService.findOneById(partialApartment.owner_id);
        if (user == null) {
            return null;
        }
        const apartment = await this.apartmentRepository.create(partialApartment);
        apartment.owner = user;
        return await this.apartmentRepository.save(apartment);
    }

    async deleteOneById(id: number): Promise<DeleteResult> {
        const apartment = await this.apartmentRepository.findOneBy({ id: id });
        if (apartment == null) {
            return null;
        }
        return await this.apartmentRepository.delete(apartment);
    }

    async update(apartment: Partial<Apartment>): Promise<Apartment> {
        await this.apartmentRepository.update(apartment.id, apartment);
        return await this.apartmentRepository.findOneBy({ id: apartment.id });
    }
}