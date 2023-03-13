import { INestApplication, Inject } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from 'supertest';
import { Apartment } from "../src/apartment/apartment.entity";
import { ApartmentModule } from "../src/apartment/apartment.module";
import { Repository } from "typeorm";
import { UserModule } from "../src/user/user.module";
import { User } from "../src/user/user.entity";

let app: INestApplication;
let apartmentRepository: Repository<Apartment>;
let userRepository: Repository<User>;

const user1 = {
    id: 1,
    first_name: "Test",
    last_name: "Alcazar",
    email: "test.alcazar@gmail.com",
    password: "azertyuiop",
    address: "7 rue Jean Jaurès",
    zipcode: "69000",
    city: "Lyon",
    country: "France"
};

const apartment1 = {
    "address": "Villa Belazur",
    "city": "Valence",
    "zipcode": "26000",
    "owner_id": 1
}

const resultApartment1 = {
    "id": 1,
    "address": "Villa Belazur",
    "city": "Valence",
    "zipcode": "26000",
    "owner": user1
}

const resultApartment2 = {
    "id": 2,
    "address": "Appartement Les fleurs bleues",
    "city": "Paris",
    "zipcode": "75000",
    "owner": user1
}

const apartment2 = {
    "address": "Appartement Les fleurs bleues",
    "city": "Paris",
    "zipcode": "75000",
    "owner_id": 1
}

const partApartment2 = {
    "id": 2,
    "zipcode": "75007"
}

const updateApartment2 = {
    "id": 2,
    "address": "Appartement Les fleurs bleues",
    "city": "Paris",
    "zipcode": "75007",
    "owner": user1
}

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
    await userRepository.save(user1);
    // await apartmentRepository.save(user2);
});

it('/apartments (POST) 1/2', async () => {
    await request(app.getHttpServer())
        .post('/apartments')
        .send(apartment1)
        .expect(201)
        .expect(resultApartment1);
    return await request(app.getHttpServer())
        .get('/apartments')
        .expect(200)
        .expect([resultApartment1]);
});

it('/apartments (GET)', async () => {
    return request(app.getHttpServer())
        .get('/apartments')
        .expect(200)
        .expect([resultApartment1]);
});

it('/apartments/:id (GET)', async () => {
    return request(app.getHttpServer())
        .get('/apartments/1')
        .expect(200)
        .expect(resultApartment1);
});

it('/apartments (POST) 2/2', async () => {
    await request(app.getHttpServer())
        .post('/apartments')
        .send(apartment2)
        .expect(201)
        .expect(resultApartment2);
    return await request(app.getHttpServer())
        .get('/apartments')
        .expect(200)
        .expect([resultApartment1, resultApartment2]);
});

it('/apartments (PUT)', async () => {
    await request(app.getHttpServer())
        .put('/apartments')
        .send(partApartment2)
        .expect(200);
    return request(app.getHttpServer())
        .get('/apartments/2')
        .expect(200)
        .expect(updateApartment2);
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
        .expect([resultApartment1]);
});

afterAll(async () => {
    await apartmentRepository.query(`TRUNCATE "apartment" RESTART IDENTITY CASCADE;`);
    await app.close();
});