import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController{


constructor(private userService: UserService){}

    @Get()
    getUsers(){
    
        return this.userService.get();
    }
    
    @Post('/register')
    store(@Body() createUserDto: CreateUserDto)
    {
        return this.userService.create(createUserDto);
    }

    @Patch('/:userId')
    update(@Body() updateUserDto: UpdateUserDto,  @Param('userId', ParseIntPipe) userId: number){
        return this.userService.update(updateUserDto,userId);    
    }

    @Get('/:userId')
    getUser(@Param('userId', ParseIntPipe) userId: number) {
      return this.userService.show(userId);
    }
  
    @Delete('/:userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: number) {
      return this.userService.delete(userId);
    }

    //ruta care verifica daca o adresa de email exista deja in baza de date
    @Get('/check-email/:email')
    async checkEmailExists(@Param('email') email: string) {
      try {
        await this.userService.checkEmailExists(email);
        return { message: 'Email is available!' };
      } catch (error) {
        return { message: 'Email already exists!' }; //mesajul care va aparea in response.data.message din frontend
      }
    }

    @Get('/check-authCode/:id/:code')
    async checkCodeExists(@Param('id') id: number, @Param('code') code: string) {
      try {
        await this.userService.checkCodeExists(id,code);
        return { message: 'Doesn t exists!' };
      } catch (error) {
        return { message: 'This is the code!' }; //mesajul care va aparea in response.data.message din frontend
      }
    }

}
