import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createBedroomDto } from "../../interfaces/createBedroom.dto";
import { ApartmentService } from "../apartment/apartment.service";
import { DeleteResult, Repository } from "typeorm";
import { Bedroom } from "./bedroom.entity";

@Injectable()
export class BedroomService {
    @Inject(ApartmentService)
    private apartmentService: ApartmentService;

    constructor(
        @InjectRepository(Bedroom)
        private bedroomRepository: Repository<Bedroom>,
    ) { }

    async findAll(): Promise<Bedroom[]> {
        return await this.bedroomRepository.find();
    }

    async findOneById(id: number): Promise<Bedroom> {
        return await this.bedroomRepository.findOneBy({ id: id });
    }

    async create(partialBedroom: createBedroomDto): Promise<Bedroom> {
        const apartment = await this.apartmentService.findOneById(partialBedroom.apartment_id);
        if (apartment == null) {
            return null;
        }
        const bedroom = await this.bedroomRepository.create(partialBedroom);
        bedroom.apartment = apartment;
        console.log(bedroom);
        return await this.bedroomRepository.save(apartment);
    }

    async deleteOneById(id: number): Promise<DeleteResult> {
        const bedroom = await this.bedroomRepository.findOneBy({ id: id });
        if (bedroom == null) {
            return null;
        }
        return await this.bedroomRepository.delete(bedroom);
    }

    async update(bedroom: Partial<Bedroom>): Promise<Bedroom> {
        await this.bedroomRepository.update(bedroom.id, bedroom);
        return await this.bedroomRepository.findOneBy({ id: bedroom.id });
    }
}