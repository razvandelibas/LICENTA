import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entitty/user.entity';
import * as bcrypt from 'bcryptjs';




@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ){}

   async checkCodeExists(id: number, code: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user.authConfirmToken === code) {
            throw new BadRequestException('This is the code!');
          }
    }

    async checkEmailExists(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            throw new BadRequestException('Email already exists');
        }
      }
   



    delete(userId: number) {
        return this.userRepository.delete(userId);
    }

    update(updateUserDto: UpdateUserDto, userId:number) {
       return this.userRepository.update(userId,updateUserDto);
    }

    async hashPassword(password: string): Promise<string> { //metoda pentru criptarea parolei, primește o parolă ca parametru și returnează parola criptată cu ajutorul lui bcryptjs.
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
      }

    async create(createUserDto: CreateUserDto) {
        const { password } = createUserDto;
        const hashedPassword = await this.hashPassword(password);
        const user = { name:createUserDto.name,email:createUserDto.email, password: hashedPassword };
        return this.userRepository.save(user);
    }


    get():Promise<User []>
    {
        return this.userRepository.find();
    }

    show(id: number)
    {
        return this.userRepository.findOne({where:{id}});
    }

    findByEmail(email:string)
    {
        return this.userRepository.findOne({where:{email}}); //verificare email 
    }

 
   

}


