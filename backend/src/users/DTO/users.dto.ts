import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;

}