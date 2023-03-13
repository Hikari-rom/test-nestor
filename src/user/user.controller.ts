import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { createUserDto } from "../../interfaces/createUser.dto";
import { DeleteResult } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async create(@Body() user: createUserDto): Promise<User> {
        return await this.userService.create(user);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    async findOne(@Param() param): Promise<User> {
        return await this.userService.findOneById(param.id);
    }

    @Put()
    async update(@Body() user: User): Promise<User> {
        return await this.userService.update(user);
    }

    @Delete('/:id')
    async deleteById(@Param() param): Promise<DeleteResult> {
        return await this.userService.deleteOneById(param.id);
    }
}