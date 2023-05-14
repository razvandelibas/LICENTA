import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RoleGuard } from './roles.guard';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from 'src/mail/mail.module';



@Module({

        controllers: [AuthController,],
        imports: [UserModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '12h'} //termenul de expirare al token-ului
    }),MailModule],
        providers: [AuthService,LocalStrategy, JwtStrategy, 
            {
                provide: APP_GUARD,
                useClass: RoleGuard,
            }, 
            ],
       
})
export class AuthModule {}
