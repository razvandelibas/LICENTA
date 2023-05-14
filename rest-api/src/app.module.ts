import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { User } from "./user/entitty/user.entity";
import { UserModule } from "./user/user.module";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MailerService } from "@nestjs-modules/mailer";
import { MailModule } from './mail/mail.module';
import { ConfigModule } from "@nestjs/config";
import { Evenimente } from "./database/entities/evenimente.entity";
import { Sali } from "./database/entities/sali.entity";
import { tipSala } from "./database/entities/tipSala.entity";
import { Planificare } from "./database/entities/planificare.entity";
import { PlanificareOrara } from "./database/entities/planificareOrara.entity";
import { ScheduleModule } from './schedule/schedule.module';
import { DatabaseModule } from './database/database.module';
import { tipEveniment } from "./database/entities/tipEveniment.entity";


@Module({
    controllers:[AppController],
    imports: [UserModule,
            TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '12345678',
            database: 'myscheduleapp',
            entities: [User, Evenimente,Sali,tipSala,Planificare, PlanificareOrara,tipEveniment],
            synchronize: true,
          }), ConfigModule.forRoot({
            isGlobal: true, 
          }),
            AuthModule,
            ProfileModule,
            MailModule,
            ScheduleModule,
            DatabaseModule,
    ]

})
export class AppModule{}