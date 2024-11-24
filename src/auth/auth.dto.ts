import { IsEmail, IsNotEmpty } from "class-validator";


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
    
    password?: string;
}