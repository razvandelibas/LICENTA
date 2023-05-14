import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreatePlanificareDto } from './dto/create-planificare.dto';
import { DatabaseService } from 'src/database/database.service';
import { AuthGuard } from '@nestjs/passport';




@Controller('/schedule')
export class ScheduleController {
  constructor( private databaseService:DatabaseService,) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPlanificare(@Req() request, @Body() createPlanificareDto: CreatePlanificareDto) {

    const sub = JSON.parse(request.user.sub);
    const userId = parseInt(sub);
  
    console.log(userId);

    const planificari = await this.databaseService.getPlanificariByDay(createPlanificareDto.ziua); 
  
    
    const sali = await this.databaseService.getAllSaliDenumireAndCapacitate();

    const intervalOrarStart = 8; // ora de incepere a activitatii (8:00)
    const intervalOrarEnd = 22; // ora de incheiere a activitatii (22:00)

    const cuantumTimp = 1; // pasul de cuantum de timp in ore

    let planificareFinala = null;
    let salaFinala = null;

    for (let oraCurenta = intervalOrarStart; oraCurenta <= intervalOrarEnd - createPlanificareDto.durata; oraCurenta += cuantumTimp) {
      for (const sala of sali) {
        if (sala.isActive && sala.capacitate >= createPlanificareDto.numarParticipanti) {
          let salaDisponibila = true;
    
          for (const planificare of planificari) {
            let seSuprapune = false;
    
            if (planificare.eveniment.owner === userId && planificare.dataInceput === createPlanificareDto.ziua) {
              seSuprapune = (oraCurenta < planificare.oraSfarsit && oraCurenta + createPlanificareDto.durata > planificare.oraInceput) ||
              (planificare.oraInceput < oraCurenta + createPlanificareDto.durata && planificare.oraSfarsit > oraCurenta);
                          
                            
            }
            if (planificare.sala === sala.denumire && planificare.dataInceput === createPlanificareDto.ziua) {
              seSuprapune = (oraCurenta < planificare.oraSfarsit && oraCurenta + createPlanificareDto.durata > planificare.oraInceput) ||
              (planificare.oraInceput < oraCurenta + createPlanificareDto.durata && planificare.oraSfarsit > oraCurenta);
            }


                                          if (seSuprapune) {
                                            salaDisponibila = false;
                                            break;
                                          }
              }
    
    
          if (salaDisponibila) {
            planificareFinala = {
              dataInceput: createPlanificareDto.ziua,
              oraInceput: oraCurenta,
              oraSfarsit: oraCurenta + createPlanificareDto.durata,
            };
            salaFinala = sala;
            break;
          }
        }
      }
    
      if (planificareFinala && salaFinala) {
        break;
      }
    }

    

    if (planificareFinala && salaFinala) {
       await this.databaseService.savePlanificareAndPlanificareOrara(planificareFinala, salaFinala, createPlanificareDto,userId);

      return {
        eveniment: {
          denumire: createPlanificareDto.denumire,
          numarParticipanti: createPlanificareDto.numarParticipanti,
          dataInceput: createPlanificareDto.ziua,
          oraInceput: planificareFinala.oraInceput,
          oraSfarsit: planificareFinala.oraSfarsit,
          sala: salaFinala.denumire,
          nivelPrioritate:createPlanificareDto.nivelPrioritate
        }
      };
    } else {
      // Nu s-a gasit o planificare corespunzatoare
      throw new HttpException('Nu s-a găsit o planificare corespunzătoare.', HttpStatus.BAD_REQUEST);
    }
  }
}