import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './DTO/users.dto';
import { ProfileDTO } from 'src/auth/auth.dto';
import { PasswordService } from 'src/auth/password/password.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        public readonly usersRepository: Repository<User>,
        public readonly passwordService: PasswordService
    ) { }

    async create(data: UserDTO): Promise<User> {
        
        const user = this.usersRepository.create(data);

        user.password = await this.passwordService.hashPassword(data.password);

        return await this.usersRepository.save(user);
    }

    async findOneByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }

    async findOneById(id: number) {
        return this.usersRepository.findOneBy({ id });
    }

    async updateProfile(user: User, data: ProfileDTO) {
        const currentUser = await this.usersRepository.findOne({
            where: { id: user.id }
        });

        currentUser.name = data.name;
        currentUser.email = data.email;
        currentUser.password = data.password;
        currentUser.role = data.role;

        await this.usersRepository.save(currentUser);
        return currentUser;

    }
}
