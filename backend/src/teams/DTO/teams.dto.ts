import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/users/users.entity";

export class TeamDTO {

    id: number;

    @IsNotEmpty()
    name: string;
    
    description: string;
    
    @IsNotEmpty()
    members: User[];

}

export class addMembers {

    @IsNotEmpty()
    @IsNumber()
    id_member: number;

    @IsNotEmpty()
    @IsNumber()
    id_leader: number;
}

export class TeamsUsersDTO {

    @IsNotEmpty()
    @IsNumber()
    team_id: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}