import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createBookingDto } from "../../interfaces/createBooking.dto";
import { BedroomService } from "../bedroom/bedroom.service";
import { UserService } from "../user/user.service";
import { DeleteResult, Repository } from "typeorm";
import { Booking } from "./booking.entity";

@Injectable()
export class BookingService {
    @Inject(BedroomService)
    private bedroomService: BedroomService;

    @Inject(UserService)
    private userService: UserService;

    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
    ) { }

    async findAll(): Promise<Booking[]> {
        return await this.bookingRepository.find();
    }

    async findOneById(id: number): Promise<Booking> {
        return await this.bookingRepository.findOneBy({ id: id });
    }

    async create(partialBooking: createBookingDto): Promise<string | Booking[]> {
        const bedroom = await this.bedroomService.findOneById(partialBooking.bedroom_id);
        if (bedroom == null) {
            return "This bedroom doesn\'t exist";
        }

        const user = await this.userService.findOneById(partialBooking.user_id);
        if (user == null) {
            return "This user doesn\'t exist";
        }

        const start_date = new Date(partialBooking.start_date);
        const start_date_check = new Date(JSON.parse(JSON.stringify(partialBooking.start_date)));
        const end_date = new Date(partialBooking.end_date);

        for (start_date_check; start_date_check <= end_date; start_date_check.setDate(start_date_check.getDate() + 1)) {
            const checkBookingDate = await this.bookingRepository.countBy({ bedroom: bedroom, date: start_date_check });
            if (checkBookingDate > 0) {
                return "This bedroom is booked on " + start_date_check.toLocaleDateString();
            }
            const checkUserBookings = await this.bookingRepository.countBy({ user: user, date: start_date_check });
            if (checkUserBookings > 0) {
                return "You have already booked a bedroom on " + start_date_check.toLocaleDateString();
            }
        }

        const bookings: Booking[] = [];
        for (start_date; start_date <= end_date; start_date.setDate(start_date.getDate() + 1)) {
            bookings.push(await this.bookingRepository.create({ date: start_date, user: user, bedroom: bedroom, price: partialBooking.price }));
        }

        return await this.bookingRepository.save(bookings);
    }

    async deleteOneById(id: number): Promise<DeleteResult> {

        const booking = await this.bookingRepository.findOneBy({ id: id });
        if (booking == null) {
            return null;
        }

        return await this.bookingRepository.delete(booking);
    }

    async update(booking: Partial<Booking>): Promise<Booking> {
        await this.bookingRepository.update(booking.id, booking);
        return await this.bookingRepository.findOneBy({ id: booking.id });
    }
}