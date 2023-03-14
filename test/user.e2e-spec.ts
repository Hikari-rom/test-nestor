import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { UserModule } from "../src/user/user.module";
import * as seedsUsers from "../test-seeds/user.seeds";

let app: INestApplication;
let usersRepository: Repository<User>;
// let userService: UserService;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
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
    usersRepository = module.get('UserRepository');
    // userService = new UserService(usersRepository);
    await usersRepository.save(seedsUsers.user1);
    await usersRepository.save(seedsUsers.user2);
});

it('/users (GET)', () => {
    return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([seedsUsers.user1, seedsUsers.user2]);
});

it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
        .expect(seedsUsers.user1);
});

it('/users (POST)', async () => {
    await request(app.getHttpServer())
        .post('/users')
        .send(seedsUsers.user3)
        .expect(201)
        .expect(seedsUsers.user3);
    return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([seedsUsers.user1, seedsUsers.user2, seedsUsers.user3]);
});

it('/users (PUT)', async () => {
    await request(app.getHttpServer())
        .put('/users')
        .send(seedsUsers.partUser3)
        .expect(200);
    return request(app.getHttpServer())
        .get('/users/3')
        .expect(200)
        .expect(seedsUsers.userUpdate3);
});

it('/users/:id (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete('/users/3')
        .expect({
            "raw": [],
            "affected": 1
        });
    return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([seedsUsers.user1, seedsUsers.user2]);
});

afterAll(async () => {
    await usersRepository.query(`TRUNCATE "user" RESTART IDENTITY CASCADE;`);
    await app.close();
});