import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTCONTANTS } from '../constants/jwt.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password/password.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: JWTCONTANTS.SECRECT,
            signOptions: { expiresIn: "15m" }
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, PasswordService, UsersService],
    exports: [AuthService, PasswordService]
})
export class AuthModule {}
