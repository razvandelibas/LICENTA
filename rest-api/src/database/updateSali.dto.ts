import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { tipSala } from './entities/tipSala.entity';

export class UpdateSali {
  @IsNotEmpty()
  @IsString()
  denumire: string;

  @IsNotEmpty() 
  tipsala: tipSala;


  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capacitate: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive:boolean;
  
}
