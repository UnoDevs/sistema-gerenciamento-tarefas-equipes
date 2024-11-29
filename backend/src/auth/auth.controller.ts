import { ProfileDTO, SignInDTO, SingUpDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

@Controller()
export class AuthController {

    constructor(public readonly authService: AuthService) { }


    @Post("login")
    async singIn(@Body() singInDTO: SignInDTO) {
        return await this.authService.singIn(singInDTO.email, singInDTO.password);
    }

    @Post("register")
    async singUp(@Body() singUp: SingUpDTO) {
        return await this.authService.singUp(singUp);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    async profile(@Request() req: Request) {
        return req["user"];
    }

    @UseGuards(AuthGuard)
    @Post("profile")
    async updateProfile(@Body() data: ProfileDTO, @Request() request: Request) {
        return await this.authService.updateProfile(data, request["user"]);
    }

}
