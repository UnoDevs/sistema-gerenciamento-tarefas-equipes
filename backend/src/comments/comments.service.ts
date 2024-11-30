import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'src/tasks/tasks.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './DTO/comment.dto';
import { Comment } from './comments.entity';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
  ) {}

  async create(createCommentDto: CreateCommentDto){
    const { content, taskId } = createCommentDto;

    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const comment = this.commentRepository.create({
      content,
      createdAt: new Date(),
      task,
    });

    return this.commentRepository.save(comment);
  }

  async findAll(){
    return this.commentRepository.find({ relations: ['task'] });
  }

  async findOne(id: number){
    const comment = await this.commentRepository.findOne({
      where: {id},
      relations: ['task'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto){
    const comment = await this.findOne(id);

    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(id: number){
    const comment = await this.findOne(id);

    await this.commentRepository.remove(comment);
  }
}