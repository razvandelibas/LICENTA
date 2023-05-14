import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UpdateTipEveniment } from './updateTipEveniment.dto';
import { UpdateSali } from './updateSali.dto';
import { tipSala } from './entities/tipSala.entity';

@Controller('/schedules')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}



  @Get('/:day')
  async getPlanificariByDay(@Param('day') day: string) {
    return await this.databaseService.getPlanificariByDay(day);
  }

  @Get()
  async getAllSaliDenumireAndCapacitate()
  {
    return await this.databaseService.getAllSaliDenumireAndCapacitate();
  }

  
  @Delete('/:userId/:ziua/:oraInceput/:oraSfarsit')
  async deletePlanificare(
    @Param('userId') userId: number,
    @Param('ziua') ziua: string,
    @Param('oraInceput') oraInceput: number,
    @Param('oraSfarsit') oraSfarsit: number
    ) {
      await this.databaseService.deletePlanificareByEventDetails(
        userId,
        ziua,
        oraInceput,
        oraSfarsit
        );
        return { message: 'Planificarea a fost ștearsă cu succes.' };
      }

      @Get('/ceva/:userId')
      async getAllPlanificariByUserId(@Param('userId') userId: number) {
       
        return await this.databaseService.getAllPlanificariByUserId(userId);
      }

      @Post('adaugarePrioritati')
      async updateTipEveniment( @Body() updateTipEveniment:UpdateTipEveniment)
      {
         return this.databaseService.updateTipEveniment( updateTipEveniment);
         
      }

      @Delete('adaugarePrioritati/:prioritate')
       deleteTipEveniment(@Param('prioritate') prioritate: number)
      {
        return this.databaseService.deleteTipEveniment(prioritate);
      }

      @Post('adaugareSali')
      async updateSali( @Body() updateSali:UpdateSali)
      {
         return this.databaseService.updateSali( updateSali);
         
      }
      
      @Delete('adaugareSali/:tipsala')
      async deleteSali(@Param('tipsala') tipsala: tipSala)
      {
        return await this.databaseService.deleteSali(tipsala);
      }

      @Get('numarPrioritati/count')
      async getNumarPrioritati() 
      {
       
        return await this.databaseService.getNumarPrioritati();
        
      }

    @Get('afisarePrioritati/all')
    async getAllPrioritati()
    {
      return await this.databaseService.getAllPrioritati();
    }

    @Put(':id/updateIsActive')
    async updateStareSali(@Param('id') id: number, @Body('isActive') isActive: boolean) {
    return this.databaseService.updateStareSali(id, isActive);
    }

}