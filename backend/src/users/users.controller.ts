import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { UserDTO } from './DTO/users.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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
        const users = this.getUsersList();

        if ((await this.userRepository.findOneBy({email: userDTO.email})) != null) {
            throw new BadRequestException("Email já cadastrado")
        }

        if (userDTO.password.length < 8) {
            throw new BadRequestException("Senha deve ter no mínimo 8 caracters")
        }

        const uppercase = /[A-Z]/g;
        const lowercase = /[a-z]/g;
        const digit = /\d/g;
        const special = /\W/g;
        
        if (userDTO.password.match(uppercase) == null) {
            throw new BadRequestException("Senha deve conter pelo menos um caracte maíusculo")
        }

        if (userDTO.password.match(lowercase) == null) {
            throw new BadRequestException("Senha deve conter pelo menos um caracte minúsculo")
        }

        if (userDTO.password.match(digit) == null) {
            throw new BadRequestException("Senha deve conter pelo menos um caracte numérico")
        }

        if (userDTO.password.match(special) == null) {
            throw new BadRequestException("Senha deve conter pelo menos um caracte especial")
        }

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
