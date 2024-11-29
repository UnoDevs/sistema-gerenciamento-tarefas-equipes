import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateTaskDTO, UpdateTaskDTO } from './DTO/tasks.dto';
import { Team } from 'src/teams/teams.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
        
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Team)
        private teamRepository: Repository<Team>
    ){}

    async findAll() {
        return this.tasksRepository.find({relations: ['users','team']});
    }

    async findById(id: number) {
        return this.tasksRepository.findOne({
            where: {id: id},
            relations: ['users','team']
        });
    }

    async findByTeam(id: number){
        const team = await this.teamRepository.findOneBy({id});
        return this.tasksRepository.find(
            {
                where: {team: team},
                relations: ['users','team']
            }
        )
    }

    async createTask(taskDTO: CreateTaskDTO){

        const {title, description, dueDate, status, teamId, createUserId} = taskDTO;

        //VALIDA ROLE DE PERMISSÕES
        const userRequest = await this.usersRepository.findOneBy({id:createUserId})
        if(!userRequest || (userRequest.role != 'ADMIN' && userRequest.role != 'LEADER')){
            throw new BadRequestException('User with no permission or not found!');
        }

        //COLETA EQUIPES
        const team = await this.teamRepository.findOne({ 
            where:{id: teamId},
            relations:['tasks']
        })
        if(!teamId){
            throw new BadRequestException('Team not found!');
        } 

        //VALIDA QUANTIDADE DE TAREFAS NO TIME
        const openTasks = team.tasks.filter(task => { return (task.status === 'Pendente' || task.status === 'Progresso')});
        if(openTasks.length >= 50){
            throw new BadRequestException('The team already has 50 open tasks! Finish the tasks!');
        }

        const task = this.tasksRepository.create({
            title,
            description,
            dueDate,
            status,
            team
        });
        return this.tasksRepository.save(task);
    }


    async assignTask(id_user,id_tasks){
        const task = await this.tasksRepository.findOne({
            where: { id: id_tasks },
            relations: ['users','team'],
        });

        const users = await this.usersRepository.findOneBy({id: id_user});

        

        task.users.push(users);
        return this.tasksRepository.save(task);
    }

    async updateTask(taskDTO: UpdateTaskDTO, taskId: number){
        const {title,description,dueDate,status,createUserId} = taskDTO;
        const taskReq = await this.tasksRepository.findOne({
            where: {id: taskId},
            relations: ['users']
        });
        if(taskReq == null){
            throw new BadRequestException('Task not found!');
        }

        const userReq = await this.usersRepository.findOne({where: {id: createUserId}});
        const hasUser = taskReq.users.filter(users => users.email === userReq.email);
        
        if(hasUser.length <= 0 && userReq.role != 'ADMIN'){
            throw new BadRequestException('User not in Task to Update');
        }

        taskReq.title = title;
        taskReq.description = description;
        taskReq.dueDate = dueDate;
        taskReq.status = status;

        return this.tasksRepository.save(taskReq);
    }

    async validatePermission(id_user,permissionRole){
        const users = await this.usersRepository.findOneBy({id: id_user});
        if(users?.role == permissionRole){
            return true;
        } else {
            return false
        }
    }

    

}
