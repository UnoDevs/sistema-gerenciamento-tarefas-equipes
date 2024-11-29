import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
        
    ){}

    async findAll() {
        return this.tasksRepository.find();
    }

    async findById(id: number) {
        return this.tasksRepository.findBy({id});
    }

    async assignTask(id_user,id_tasks){
        let task = await this.findById(id_tasks);
        
        task[0].users
    }

}
