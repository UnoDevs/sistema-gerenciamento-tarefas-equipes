import { Body, Controller, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AssignTaskToUserDTO, CreateTaskDTO, UpdateTaskDTO } from './DTO/tasks.dto';
import { ROLESCONSTANTS } from 'src/constants/role.constants';

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
    async assignTask(@Body() taskDTO: AssignTaskToUserDTO){

        const authorizedAdmin = await this.tasksService.validatePermission(taskDTO.requestUserId,'ADMIN');
        const authorizedLeader = await this.tasksService.validatePermission(taskDTO.requestUserId,'LEADER');

        if(!authorizedAdmin && !authorizedLeader){
            throw new UnauthorizedException('Requesting user does not have permission!');
        } else {
            return this.tasksService.assignTask(taskDTO.user_id,taskDTO.task_id);
        } 
    }

    @Put(':id')
    async updateTask(@Param('id') id: number, @Body() taskDTO: UpdateTaskDTO){
        return this.tasksService.updateTask(taskDTO,id);
    }

    @Get(':id/comments')
    async findComments(@Param('id') id: number){
        return this.tasksService.getTaskComments(id);
    }
}
