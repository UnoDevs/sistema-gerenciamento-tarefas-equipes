import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]),UsersModule],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService]
})
export class TeamsModule {}
