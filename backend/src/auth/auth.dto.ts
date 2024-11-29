import { IsEmail, IsNotEmpty } from "class-validator";

export class SingUpDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    password: string;
}

export class SignInDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class ProfileDTO {
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    role: string;
    
    password?: string;
}