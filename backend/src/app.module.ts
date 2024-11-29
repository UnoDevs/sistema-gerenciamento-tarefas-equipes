// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'sistema',
      entities: [User],
      synchronize: true,
    }),
    // MailerModule.forRoot(MailerConfig),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
