import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';

@Module({
  controllers: [TeamsController]
})
export class TeamsModule {}
