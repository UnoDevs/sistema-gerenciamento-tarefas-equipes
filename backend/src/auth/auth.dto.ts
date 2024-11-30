import { IsEmail, IsNotEmpty } from "class-validator";
import { Tasks } from "src/tasks/tasks.entity";
import { Team } from "src/teams/teams.entity";

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
    
    id?: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    role: string;

    teams?: Team[];
    
    tasks?: Tasks[];
    
    password?: string;
}