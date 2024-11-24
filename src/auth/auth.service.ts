import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { ProfileDTO } from './auth.dto';
import { PasswordService } from './password/password.service';

export interface AuthResult {
    access_token: string;
}

@Injectable()
export class AuthService {

    constructor(
        public readonly userService: UsersService,
        public readonly jwtService: JwtService,
        public readonly passwordService: PasswordService,
    ) { }

    async singIn(emailUser: string, password: string): Promise<AuthResult> {

        const user = await this.userService.findOneByEmail(emailUser);

        if (!user) {
            throw new UnauthorizedException("Email ou Senha incorretos");
        }

        if (!( await this.passwordService.comparePassword(password, user.password))) {
            throw new UnauthorizedException("Email ou Senha incorretos");
        }

        const { id: sub, email } = user;

        return {
            access_token: await this.jwtService.signAsync({ sub, email })
        }
    }

    async updateProfile(profileDTO: ProfileDTO, user: User) {
        return this.userService.updateProfile(user, profileDTO);
    }
}
