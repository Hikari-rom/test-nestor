import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { UserModule } from "../src/user/user.module";

let app: INestApplication;
let usersRepository: Repository<User>;
// let userService: UserService;
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
const user2 = {
    id: 2,
    first_name: "Test",
    last_name: "Balthazar",
    email: "test.balthazar@gmail.com",
    password: "azertyuiop",
    address: "7 rue Jean Jaurès",
    zipcode: "69000",
    city: "Lyon",
    country: "France"
};
const user3 = {
    id: 3,
    first_name: "Test",
    last_name: "Carolina",
    email: "test.carolina@gmail.com",
    password: "azertyuiop",
    address: "7 rue Jean Jaurès",
    zipcode: "69000",
    city: "Lyon",
    country: "France"
}

const partUser3 = {
    id: 3,
    zipcode: "69009"
}

const userUpdate3 = {
    id: 3,
    first_name: "Test",
    last_name: "Carolina",
    email: "test.carolina@gmail.com",
    password: "azertyuiop",
    address: "7 rue Jean Jaurès",
    zipcode: "69009",
    city: "Lyon",
    country: "France"
}

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
    await usersRepository.save(user1);
    await usersRepository.save(user2);
});

it('/users (GET)', async () => {
    return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([user1, user2]);
});

it('/users/:id (GET)', async () => {
    return request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
        .expect(user1);
});

it('/users (POST)', async () => {
    await request(app.getHttpServer())
        .post('/users')
        .send(user3)
        .expect(201)
        .expect(user3);
    return await request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([user1, user2, user3]);
});

it('/users (PUT)', async () => {
    await request(app.getHttpServer())
        .put('/users')
        .send(partUser3)
        .expect(200);
    return request(app.getHttpServer())
        .get('/users/3')
        .expect(200)
        .expect(userUpdate3);
});

it('/users/:id (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete('/users/3')
        .expect({
            "raw": [],
            "affected": 1
        });
    return await request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([user1, user2]);
});

afterAll(async () => {
    await usersRepository.query(`TRUNCATE "user" RESTART IDENTITY CASCADE;`);
    await app.close();
});