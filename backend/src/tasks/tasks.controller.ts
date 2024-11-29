import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AssignTaskToUserDTO, CreateTaskDTO } from './DTO/tasks.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number){
        return this.tasksService.findById(id);
    }

    @Post()
    create(@Body() taskDTO: CreateTaskDTO){
        return this.tasksService.createTask(taskDTO);
    }

    @Put('assigntask')
    assignTask(@Body() taskDTO: AssignTaskToUserDTO){
        return this.tasksService.assignTask(taskDTO.user_id,taskDTO.task_id);
    }
}
