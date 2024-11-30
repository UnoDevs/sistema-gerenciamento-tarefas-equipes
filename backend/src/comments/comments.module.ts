import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from 'src/tasks/tasks.entity';
import { Comment } from './comments.entity';

@Module({
imports:[TypeOrmModule.forFeature([Comment,Tasks])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
