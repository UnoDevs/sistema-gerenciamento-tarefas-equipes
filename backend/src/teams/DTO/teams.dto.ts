import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/users/users.entity";

export class TeamDTO {

    @IsNotEmpty()
    name: string;
    
    description: string;
    
    @IsNotEmpty()
    members: User[];

}

export class TeamsUsersDTO {

    @IsNotEmpty()
    @IsNumber()
    team_id: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}