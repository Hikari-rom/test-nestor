import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from 'supertest';
import { Apartment } from "../src/apartment/apartment.entity";
import { ApartmentModule } from "../src/apartment/apartment.module";
import { Bedroom } from "../src/bedroom/bedroom.entity";
import { BedroomModule } from "../src/bedroom/bedroom.module";
import { Repository } from "typeorm";
import * as seedsUsers from "../test-seeds/user.seeds";
import * as seedsApartments from "../test-seeds/apartment.seeds";
import * as seedsBedrooms from "../test-seeds/bedroom.seeds";

import { User } from "../src/user/user.entity";
import { UserModule } from "../src/user/user.module";

let app: INestApplication;
let bedroomRepository: Repository<Bedroom>;
let apartmentRepository: Repository<Apartment>;
let userRepository: Repository<User>;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
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
    await userRepository.save(seedsUsers.user1);
    await apartmentRepository.save(seedsApartments.apartment1);
});

it('/bedrooms (POST) 1/2', async () => {
    await request(app.getHttpServer())
        .post('/bedrooms')
        .send(seedsBedrooms.bedroom1)
        .expect(201)
        .expect(seedsBedrooms.resultBedroom1);
    return await request(app.getHttpServer())
        .get('/bedrooms')
        .expect(200)
        .expect([seedsBedrooms.resultBedroom1]);
});

it('/bedrooms (GET)', async () => {
    return request(app.getHttpServer())
        .get('/bedrooms')
        .expect(200)
        .expect([seedsBedrooms.resultBedroom1]);
});

it('/bedrooms/:id (GET)', async () => {
    return request(app.getHttpServer())
        .get('/bedrooms/1')
        .expect(200)
        .expect(seedsBedrooms.resultBedroom1);
});

it('/bedrooms (POST) 2/2', async () => {
    await request(app.getHttpServer())
        .post('/bedrooms')
        .send(seedsBedrooms.bedroom2)
        .expect(201)
        .expect(seedsBedrooms.resultBedroom2);
    return await request(app.getHttpServer())
        .get('/bedrooms')
        .expect(200)
        .expect([seedsBedrooms.resultBedroom1, seedsBedrooms.resultBedroom2]);
});

it('/bedrooms (PUT)', async () => {
    await request(app.getHttpServer())
        .put('/bedrooms')
        .send(seedsBedrooms.partBedroom2)
        .expect(200);
    return request(app.getHttpServer())
        .get('/bedrooms/2')
        .expect(200)
        .expect(seedsBedrooms.updateBedroom2);
});

it('/bedrooms/:id (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete('/bedrooms/2')
        .expect({
            "raw": [],
            "affected": 1
        });
    return await request(app.getHttpServer())
        .get('/bedrooms')
        .expect(200)
        .expect([seedsBedrooms.resultBedroom1]);
});

afterAll(async () => {
    await bedroomRepository.query(`TRUNCATE "bedroom" RESTART IDENTITY CASCADE;`);
    await apartmentRepository.query(`TRUNCATE "apartment" RESTART IDENTITY CASCADE;`);
    await userRepository.query(`TRUNCATE "user" RESTART IDENTITY CASCADE;`);
    await app.close();
});