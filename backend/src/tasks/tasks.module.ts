import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks,User])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
