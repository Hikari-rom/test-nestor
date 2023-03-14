import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from 'supertest';
import { Bedroom } from "../src/bedroom/bedroom.entity";
import { BedroomModule } from "../src/bedroom/bedroom.module";
import { User } from "../src/user/user.entity";
import { UserModule } from "../src/user/user.module";
import { Repository } from "typeorm";
import * as seedsUsers from "../test-seeds/user.seeds";
import * as seedsApartments from "../test-seeds/apartment.seeds";
import * as seedsBedrooms from "../test-seeds/bedroom.seeds";
import * as seedsBookings from "../test-seeds/booking.seeds";
import { Apartment } from "../src/apartment/apartment.entity";
import { ApartmentModule } from "../src/apartment/apartment.module";
import { Booking } from "../src/booking/booking.entity";
import { BookingModule } from "../src/booking/booking.module";

let app: INestApplication;
let bookingRepository: Repository<Booking>;
let bedroomRepository: Repository<Bedroom>;
let apartmentRepository: Repository<Apartment>;
let userRepository: Repository<User>;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            BookingModule,
            BedroomModule,
            ApartmentModule,
            UserModule,
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'nestor',
                password: 'nestor',
                database: 'nestor',
                entities: ['./**/*.entity.ts'],
                synchronize: true,
            }),
        ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    bedroomRepository = module.get('BedroomRepository');
    apartmentRepository = module.get('ApartmentRepository');
    userRepository = module.get('UserRepository');
    bookingRepository = module.get('BookingRepository');
    await userRepository.save([seedsUsers.user1, seedsUsers.user2]);
    await apartmentRepository.save(seedsApartments.resultApartment1);
    await bedroomRepository.save([seedsBedrooms.resultBedroom1, seedsBedrooms.resultBedroom2]);
});

it('/bookings (POST) 1/2', async () => {
    await request(app.getHttpServer())
        .post('/bookings')
        .send(seedsBookings.createBooking1)
        .expect(201)
        .expect(seedsBookings.bookingsResult1);
});

it('/bookings/:id (GET)', async () => {
    return await request(app.getHttpServer())
        .get('/bookings/1')
        .expect(200)
        .expect(seedsBookings.bookingGet1);
});

it('/bookings (PUT)', async () => {
    await request(app.getHttpServer())
        .put('/bookings')
        .send(seedsBookings.partialBooking2)
        .expect(200);
    return await request(app.getHttpServer())
        .get('/bookings/2')
        .expect(200)
        .expect(seedsBookings.bookingUpdate2);
});

it('/bookings/:id (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete('/bookings/2')
        .expect({
            "raw": [],
            "affected": 1
        });
    return await request(app.getHttpServer())
        .get('/bookings')
        .expect(200)
        .expect([seedsBookings.bookingGet1]);
});

afterAll(async () => {
    await bookingRepository.query(`TRUNCATE "booking" RESTART IDENTITY CASCADE;`);
    await bedroomRepository.query(`TRUNCATE "bedroom" RESTART IDENTITY CASCADE;`);
    await apartmentRepository.query(`TRUNCATE "apartment" RESTART IDENTITY CASCADE;`);
    await userRepository.query(`TRUNCATE "user" RESTART IDENTITY CASCADE;`);
    await app.close();
});