import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Team } from "src/teams/teams.entity";

export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNotEmpty()
    dueDate: Date;
    status: string;
    @IsNotEmpty()
    @IsNumber()
    createUserId: number;
}

export class AssignTaskToUserDTO {
    @IsNotEmpty()
    @IsNumber()
    task_id: number;
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}