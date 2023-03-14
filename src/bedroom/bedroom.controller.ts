import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { createBedroomDto } from "../../interfaces/createBedroom.dto";
import { DeleteResult } from "typeorm";
import { Bedroom } from "./bedroom.entity";
import { BedroomService } from "./bedroom.service";

@Controller('bedrooms')
export class BedroomController {
    constructor(private bedroomService: BedroomService) { }

    @Post()
    @ApiBody({ type: createBedroomDto })
    async create(@Body() partialApartment: createBedroomDto): Promise<Bedroom> {
        const bedroom = await this.bedroomService.create(partialApartment);
        if (bedroom == null) {
            throw new HttpException('This apartment doesn\`t exist', HttpStatus.BAD_REQUEST);
        }
        return bedroom;
    }

    @Get()
    async findAll(): Promise<Bedroom[]> {
        return this.bedroomService.findAll();
    }

    @Get('/:id')
    async findOne(@Param() param): Promise<Bedroom> {
        return await this.bedroomService.findOneById(param.id);
    }

    @Put()
    async update(@Body() user: Partial<Bedroom>): Promise<Bedroom> {
        return await this.bedroomService.update(user);
    }

    @Delete('/:id')
    async deleteById(@Param() param): Promise<DeleteResult> {
        return await this.bedroomService.deleteOneById(param.id);
    }
}