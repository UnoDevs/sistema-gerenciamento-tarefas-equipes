import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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