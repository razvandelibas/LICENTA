import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { tipEveniment } from 'src/database/entities/tipEveniment.entity';

export class CreatePlanificareDto {
  @IsNotEmpty()
  @IsString()
  denumire: string;

  @IsNotEmpty()
  @IsString()
  //@IsDateString()
  ziua: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  numarParticipanti: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  durata: number;

  @IsNotEmpty()
 /* @IsNumber()
  @IsPositive()*/
  nivelPrioritate:tipEveniment;

  
}
