import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { createBookingDto } from "../../interfaces/createBooking.dto";
import { DeleteResult } from "typeorm";
import { Booking } from "./booking.entity";
import { BookingService } from "./booking.service";

@Controller('bookings')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Post()
    @ApiBody({ type: createBookingDto })
    async create(@Body() partialApartment: createBookingDto): Promise<Booking[]> {
        const booking = await this.bookingService.create(partialApartment);
        if (typeof booking === "string") {
            throw new HttpException(booking, HttpStatus.BAD_REQUEST);
        }
        return booking;
    }

    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingService.findAll();
    }

    @Get('/:id')
    async findOne(@Param() param): Promise<Booking> {
        return await this.bookingService.findOneById(param.id);
    }

    @Put()
    async update(@Body() booking: Partial<Booking>): Promise<Booking> {
        return await this.bookingService.update(booking);
    }

    @Delete('/:id')
    async deleteById(@Param() param): Promise<DeleteResult> {
        return await this.bookingService.deleteOneById(param.id);
    }
}