import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserDto } from "../../interfaces/createUser.dto";
import { DeleteResult, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOneById(id: number): Promise<User> {
        return await this.usersRepository.findOneBy({ id: id });
    }

    async create(partialUser: createUserDto): Promise<User> {
        const user = await this.usersRepository.create(partialUser);
        return await this.usersRepository.save(user);
    }

    async deleteOneById(id: number): Promise<DeleteResult> {
        const user = await this.usersRepository.findOneBy({ id: id });
        if (user == null) {
            return null;
        }
        return await this.usersRepository.delete(user);
    }

    async update(user: Partial<User>): Promise<User> {
        await this.usersRepository.update(user.id, user);
        return await this.usersRepository.findOneBy({ id: user.id });
    }
}