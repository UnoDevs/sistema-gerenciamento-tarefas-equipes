import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { UserDTO } from './DTO/users.dto';

@Controller('users')
export class UsersController {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UsersService
    ) { }

    @Get()
    getUsersList() {
        return this.userRepository.find();
    }

    @Get(":id")
    async getUserById(@Param("id") id: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        return user;
    }

    @Post()
    async createUser(@Body() userDTO: UserDTO) {
        return await this.userService.create(userDTO);
    }

    @Delete(":id")
    async deleteUserById(@Param("id") id: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        this.userRepository.delete({ id: user.id });

    }
}
