import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateTipEveniment {
  @IsNotEmpty()
  @IsString()
  denumire: string;

 
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  prioritate: number;


  
}
