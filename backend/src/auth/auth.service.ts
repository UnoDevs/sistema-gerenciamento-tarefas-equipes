import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { ProfileDTO } from './auth.dto';
import { PasswordService } from './password/password.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDTO } from 'src/users/DTO/users.dto';
import { MailerConfig } from 'src/configs/mailer.config';

export interface AuthResult {
    access_token: string;
}

@Injectable()
export class AuthService {

    constructor(
        public readonly userService: UsersService,
        public readonly jwtService: JwtService,
        public readonly passwordService: PasswordService,
        public readonly mailerService: MailerService
    ) { }

    async singUp(userDTO: UserDTO): Promise<User> {
        
        if (!!(await this.userService.findOneByEmail( userDTO.email ))) {
            throw new BadRequestException("Email ja Cadastrado");
        }

        const user = await this.userService.create(userDTO);
            
        // const { id: sub } = user;
        // const mail = {
        //     to: user.email,
        //     from: "projetosunodevs@gmail.com",
        //     subject: "Email de Confirmação",
        //     template: "email-confirmation",
        //     context: {
        //         token: await this.jwtService.sign({ sub })
        //     }
        // };
        
        // await this.mailerService.sendMail(mail);
        
        return user;
    }

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
