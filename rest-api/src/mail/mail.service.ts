import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entitty/user.entity';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;
   
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Cod de securitate!',
      //template: './confirmation', 
      text: `Bună, ${user.name}! Am observat o nouă conexiune la contul dumneavoastră! Vă rugam să utilizati codul de securitate ${token} pentru a vă confirma identitatea. Mulțumim!`,
      context: { 
        name: user.name,
        url,
      },
    });
  }
}