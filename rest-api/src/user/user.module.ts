import { MailerService } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { User } from "./entitty/user.entity";
import { UserController } from "./user.controller";
import { UserService } from './user.service';


@Module({
    controllers: [UserController, ],
    providers: [UserService, ],
    imports: [TypeOrmModule.forFeature([User]),],
    exports: [UserService],
})
export class UserModule{}