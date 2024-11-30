import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './DTO/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto){
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.commentsService.remove(id);
  }
}