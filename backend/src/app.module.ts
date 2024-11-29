import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'sistema',
      entities: [User, Tasks],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule
  ],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
