import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { createApartmentDto } from "../../interfaces/createApartment.dto";
import { DeleteResult } from "typeorm";
import { Apartment } from "./apartment.entity";
import { ApartmentService } from "./apartment.service";

@Controller('apartments')
export class ApartmentController {
    constructor(private apartmentService: ApartmentService) { }

    @Post()
    @ApiBody({ type: createApartmentDto })
    async create(@Body() partialApartment: createApartmentDto): Promise<Apartment> {
        const apartment = await this.apartmentService.create(partialApartment);
        if (apartment == null) {
            throw new HttpException('This user doesn\`t exist', HttpStatus.BAD_REQUEST);
        }
        return apartment;
    }

    @Get()
    async findAll(): Promise<Apartment[]> {
        return this.apartmentService.findAll();
    }

    @Get('/:id')
    async findOne(@Param() param): Promise<Apartment> {
        return await this.apartmentService.findOneById(param.id);
    }

    @Put()
    async update(@Body() user: Apartment): Promise<Apartment> {
        return await this.apartmentService.update(user);
    }

    @Delete('/:id')
    async deleteById(@Param() param): Promise<DeleteResult> {
        return await this.apartmentService.deleteOneById(param.id);
    }
}