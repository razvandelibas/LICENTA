import { IsBoolean, IsEmail, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";


export class UpdateUserDto{

    @IsString()
    name:string;

    @IsEmail()
    email:string;

   
    @IsString()
    password:string;

   /* @IsString()
    @IsIn(['Admin', 'BasicUser']) // validează valorile posibile
    role: string;*/

    @IsString()
    @IsOptional()
    authConfirmToken: string;
    
   
    
}