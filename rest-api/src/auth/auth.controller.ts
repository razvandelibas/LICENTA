import { Body, Controller, Post, UseGuards, Request, Get, Render, BadRequestException, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from 'src/mail/mail.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entitty/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
   


constructor(private authService: AuthService, private userService: UserService, private mailService: MailService){}


//AuthGuard va apela metoda validate din local.strategy, care va verifica daca datele de autentificare sunt valide si va returna un obiect de tip User daca autentificarea este reusita. 
//Apoi, obiectul User este pus in obiectul Request de catre AuthGuard si este transmis mai departe in metoda login a authService, unde se genereaza si se returneaza token-ul JWT.
@UseGuards(AuthGuard('local'))//folosit pentru protejarea rutelor de acces neautorizat
@Post('/login')
async login(@Request() req:any)
{
   const token = Math.floor(1000 + Math.random() * 9000).toString();
   const updateUserDto = new UpdateUserDto();
   updateUserDto.authConfirmToken = token;
   
   await this.userService.update(updateUserDto,   req.user.id );
   await this.mailService.sendUserConfirmation(req.user, token);
   return this.authService.login(req.user);
}


@UseGuards(AuthGuard('jwt'))
@Post('/2fa')
async twoFa(@Request() req: any, @Body('code') code: string) { //verificam codul introdus de user cu cel din bd(de pe mail)
   
   const sub = JSON.parse(req.user.sub);//parsam json-ul care reprez continutul jwt-ului si extragem id-ul
   const userId = parseInt(sub);
   const user = await this.userService.show(userId);
   const savedCode = user.authConfirmToken;
   
   if (!user || !user.authConfirmToken) {
    throw new BadRequestException('Invalid user');
   }
   if (savedCode === code) {
     // codul introdus de utilizator este corect
     return { message: 'Two-factor authentication successful'};
   } else {
     // codul introdus de utilizator este incorect
     throw new BadRequestException('Invalid 2FA code');
   }
 }

}
