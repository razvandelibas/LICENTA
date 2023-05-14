import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entitty/user.entity';

@Injectable()
export class AuthService {

constructor(
  private userService: UserService,
  private jwtService: JwtService,
  ){}




async validateUser(email:string,password:string)//apelata in local.strategy pentru passport auth
{


const user=await this.userService.findByEmail(email);
const passwordMatch = await bcrypt.compare(password, user.password); //compar hash-ul rezultat cu cel din baza de date
       if( user && passwordMatch)
       {
         return user;
       }
      
    return null;

}



async login(user: any) //generare jwt pe baza detaliilor user-ului
{
  
  const payload = {role: user.role, sub: user.id};
  
  return {
    acces_token: this.jwtService.sign(payload),
  }
}





}
