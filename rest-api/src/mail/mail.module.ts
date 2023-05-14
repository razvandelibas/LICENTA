import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Global() 
@Module({
  imports: [
    MailerModule.forRootAsync({
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: 'myscheduleapp@outlook.com',
          pass: 'gompqumfxwuhrluq',
        },
      },
      defaults: {
        from: '"MySchedule App" <myscheduleapp@outlook.com>',
      },
     /* template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: true,
        },
      },*/
    }),
    inject: [ConfigService],
  }),
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}