import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateTaskDTO } from './DTO/tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
        
        @InjectRepository(User)
        private usersRepository: Repository<User>
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

    async createTask(taskDTO: CreateTaskDTO){
        const task = this.tasksRepository.create(taskDTO);
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

    async updateTask(taskDTO: CreateTaskDTO){
        
    }

    async validatePermission(id_user,permissionRole){
        const users = await this.usersRepository.findOneBy({id: id_user});

        //Validar se o usuário possui o acesso necessário

    }

}
