import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from 'supertest';
import { Apartment } from "../src/apartment/apartment.entity";
import { ApartmentModule } from "../src/apartment/apartment.module";
import { Repository } from "typeorm";
import { UserModule } from "../src/user/user.module";
import { User } from "../src/user/user.entity";
import * as seedsUsers from "../test-seeds/user.seeds";
import * as seedsApartments from "../test-seeds/apartment.seeds";

let app: INestApplication;
let apartmentRepository: Repository<Apartment>;
let userRepository: Repository<User>;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
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
    apartmentRepository = module.get('ApartmentRepository');
    userRepository = module.get('UserRepository');
    await userRepository.save(seedsUsers.user1);
});

it('/apartments (POST) 1/2', async () => {
    await request(app.getHttpServer())
        .post('/apartments')
        .send(seedsApartments.apartment1)
        .expect(201)
        .expect(seedsApartments.resultApartment1);
    return await request(app.getHttpServer())
        .get('/apartments')
        .expect(200)
        .expect([seedsApartments.resultApartment1]);
});

it('/apartments (GET)', async () => {
    return request(app.getHttpServer())
        .get('/apartments')
        .expect(200)
        .expect([seedsApartments.resultApartment1]);
});

it('/apartments/:id (GET)', async () => {
    return request(app.getHttpServer())
        .get('/apartments/1')
        .expect(200)
        .expect(seedsApartments.resultApartment1);
});

it('/apartments (POST) 2/2', async () => {
    await request(app.getHttpServer())
        .post('/apartments')
        .send(seedsApartments.apartment2)
        .expect(201)
        .expect(seedsApartments.resultApartment2);
    return await request(app.getHttpServer())
        .get('/apartments')
        .expect(200)
        .expect([seedsApartments.resultApartment1, seedsApartments.resultApartment2]);
});

it('/apartments (PUT)', async () => {
    await request(app.getHttpServer())
        .put('/apartments')
        .send(seedsApartments.partApartment2)
        .expect(200);
    return request(app.getHttpServer())
        .get('/apartments/2')
        .expect(200)
        .expect(seedsApartments.updateApartment2);
});

it('/apartments/:id (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete('/apartments/2')
        .expect({
            "raw": [],
            "affected": 1
        });
    return await request(app.getHttpServer())
        .get('/apartments')
        .expect(200)
        .expect([seedsApartments.resultApartment1]);
});

afterAll(async () => {
    await apartmentRepository.query(`TRUNCATE "apartment" RESTART IDENTITY CASCADE;`);
    await userRepository.query(`TRUNCATE "user" RESTART IDENTITY CASCADE;`);
    await app.close();
});