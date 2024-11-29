import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { TeamsService } from './teams/teams.service';
import { TeamsModule } from './teams/teams.module';

// import { MailerModule } from '@nestjs-modules/mailer';
// import * as handlebars from "handlebars";
// import path from 'path';
// import { MailerConfig } from './configs/mailer.config';

// const helpers = {
  
//   handlebarsIntl: function(value) {
    
//     let context = {
//       value: value
//     };

//     var intlData = {
//       locales: ["pt-BR"]
//     };

//     const template = handlebars.compile("{{ number }} is the final result!");

//     const compiled = template(context, {
//       data: { intl: intlData }
//     });

//     return compiled;

//   }

// };
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks/tasks.entity';
import { Team } from './teams/teams.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'sistema',
      entities: [User, Tasks,Team],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    TeamsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
