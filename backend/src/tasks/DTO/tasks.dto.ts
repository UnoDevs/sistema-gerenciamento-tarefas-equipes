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
    @IsNotEmpty()
    @IsNumber()
    teamId: number;
}

export class AssignTaskToUserDTO {
    @IsNotEmpty()
    @IsNumber()
    task_id: number;
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
    @IsNumber()
    @IsNotEmpty()
    requestUserId: number;
}

export class UpdateTaskDTO {
    @IsString()
    title: string;
    @IsString()
    description: string;
    dueDate: Date;
    status: string;
    @IsNumber()
    createUserId: number;
}

export class UpdateStatusDTO {
    @IsNotEmpty()
    @IsString()
    status: string;
    @IsNotEmpty()
    @IsNumber()
    taskId: number;
    @IsNotEmpty()
    @IsNumber()
    requestUserId: number;
}