import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanificareDto } from 'src/schedule/dto/create-planificare.dto';
import { User } from 'src/user/entitty/user.entity';
import {  Repository } from 'typeorm';
import { Evenimente } from './entities/evenimente.entity';
import { Planificare } from './entities/planificare.entity';
import {  PlanificareOrara } from './entities/planificareOrara.entity';
import { Sali } from './entities/sali.entity';
import { tipSala } from './entities/tipSala.entity';
import { tipEveniment } from './entities/tipEveniment.entity';
import { UpdateTipEveniment } from './updateTipEveniment.dto';
import { UpdateSali } from './updateSali.dto';

@Injectable()
export class DatabaseService {
  

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Evenimente)
        private evenimenteRepository: Repository<Evenimente>,
        @InjectRepository(Sali)
        private saliRepository: Repository<Sali>,
        @InjectRepository(tipSala)
        private tipSalaRepository: Repository<tipSala>,
        @InjectRepository(Planificare)
        private planificareRepository: Repository<Planificare>,
        @InjectRepository(PlanificareOrara)
        private planificareOraraRepository: Repository<PlanificareOrara>,
        @InjectRepository(tipEveniment)
        private tipEvenimentRepository: Repository<tipEveniment>
    ){}

    async getPlanificariByDay(day: string): Promise<any[]> {
        const planificari = await this.planificareRepository
          .createQueryBuilder('planificare')
          .leftJoinAndSelect('planificare.evenimente', 'evenimente')
          .leftJoinAndSelect('evenimente.user', 'user')
          .leftJoinAndSelect('planificare.sali', 'sali')
          .leftJoinAndSelect('planificare.planificareOrara', 'planificareOrara')
          .where('planificare.dataInceput = :day', { day })
          .getMany(); //getMany pentru a obtine toate inregistrarile
      
          
          const result = planificari.map(planificare => {
          // console.log(planificare.evenimente.user.email);
          return {
            dataInceput: planificare.dataInceput,
           // dataSfarsit: planificare.dataSfarsit,
           oraInceput: planificare.planificareOrara.map(p => p.oraInceput),
           oraSfarsit: planificare.planificareOrara.map(p => p.oraSfarsit),// se face un array pt ambele deoarece o planificareOrara poate avea mai multe planificari (OneToMany) adica evenimentul poate avea loc pe mai multe zile
           sala: planificare.sali.denumire,
           eveniment: {
              denumire: planificare.evenimente.denumire,
              numarParticipanti: planificare.evenimente.numarParticipanti,
              owner: planificare.evenimente.user.id,
              nivelPriortiate:planificare.evenimente.tipeveniment
            }
        };
        });
      
        return result;
      }

      async getAllSaliDenumireAndCapacitate(): Promise<{ id:number, denumire: string; capacitate: number; isActive:boolean }[]> {
        const sali = await this.saliRepository.find({ select: ['id','denumire', 'capacitate', 'isActive'] });
      
        return sali.map(sala => ({
          id: sala.id,
          denumire: sala.denumire,
          capacitate: sala.capacitate,
          isActive:sala.isActive
        }));
      }

      async savePlanificareAndPlanificareOrara(
        planificareData: {
          dataInceput: string;
          oraInceput: number;
          oraSfarsit: number;
        },
        sala: { id:number; denumire: string; capacitate: number },
        createPlanificareDto: CreatePlanificareDto,
        userId:number
      )
      {
           const user = new User();
           user.id = userId;

            const eveniment=new Evenimente();
            eveniment.denumire=createPlanificareDto.denumire;
            eveniment.dataInceput=createPlanificareDto.ziua;
            eveniment.dataSfarsit=createPlanificareDto.ziua;
            eveniment.user=user;
            eveniment.numarParticipanti=createPlanificareDto.numarParticipanti;
            eveniment.tipeveniment=createPlanificareDto.nivelPrioritate;

          const saveEveniment =  await this.evenimenteRepository.save(eveniment);

             const salaId =new Sali();         
             salaId.id=sala.id;

             const evenimentNou=new Evenimente();
             evenimentNou.id=saveEveniment.id;

             const planificare=new Planificare();
             planificare.dataInceput=createPlanificareDto.ziua;
             planificare.dataSfarsit=createPlanificareDto.ziua;
             planificare.evenimente=evenimentNou;
             planificare.sali=salaId;

          const savePlanificare =  await this.planificareRepository.save(planificare);
             
             const planificareNoua=new Planificare();
             planificareNoua.id=savePlanificare.id;

             const planificareOrara= new PlanificareOrara();
             planificareOrara.data=createPlanificareDto.ziua;
             planificareOrara.oraInceput=planificareData.oraInceput;
             planificareOrara.oraSfarsit=planificareData.oraSfarsit;
             planificareOrara.planificare=planificareNoua;

             await this.planificareOraraRepository.save(planificareOrara);
             

      }


      async deletePlanificareByEventDetails(
        userId: number,
        ziua: string,
        oraInceput: number,
        oraSfarsit: number
      ) {
        // intai gasim evenimentul si planificarea pe baza detaliilor furnizate
        const foundPlanificareOrara = await this.planificareOraraRepository
          .createQueryBuilder('planificareOrara')
          .leftJoinAndSelect('planificareOrara.planificare', 'planificare')
          .leftJoinAndSelect('planificare.evenimente', 'evenimente')
          .leftJoinAndSelect('evenimente.user', 'user')
          .where('evenimente.user.id = :userId', { userId })
          .andWhere('planificareOrara.data = :ziua', { ziua })
          .andWhere('planificareOrara.oraInceput = :oraInceput', { oraInceput })
          .andWhere('planificareOrara.oraSfarsit = :oraSfarsit', { oraSfarsit })
          .getOne();
      
        if (!foundPlanificareOrara) {
          // Daca nu se găsește nicio planificare, returnează un mesaj de eroare
          throw new NotFoundException('Nu a fost găsită nicio planificare cu detaliile furnizate.');
        }
      
        // Altfel, sterge planificarea orara si apoi planificarea și evenimentul asociat
        await this.planificareOraraRepository.remove(foundPlanificareOrara); //sterge inregistrarea foundPlanificareOrara din tabela planificare_orara
        await this.planificareRepository.remove(foundPlanificareOrara.planificare);//După ce s-a sters inregistrarea din planificare_orara, se sterge inregistrarea asociata din tabela planificare. 
        await this.evenimenteRepository.remove(foundPlanificareOrara.planificare.evenimente);// sterge inregistrarea asociata cu evenimentul din tabela evenimente.
      }

      async getAllPlanificariByUserId(userId: number): Promise<any[]> {
        const planificari = await this.planificareRepository
          .createQueryBuilder('planificare')
          .leftJoinAndSelect('planificare.evenimente', 'evenimente')
          .leftJoinAndSelect('evenimente.user', 'user')
          .leftJoinAndSelect('planificare.sali', 'sali')
          .leftJoinAndSelect('planificare.planificareOrara', 'planificareOrara')
          .where('user.id = :userId', { userId })
          .getMany();
      
        const result = planificari.map(planificare => {
          return {
            dataInceput: planificare.dataInceput,
            oraInceput: planificare.planificareOrara.map(p => p.oraInceput),
            oraSfarsit: planificare.planificareOrara.map(p => p.oraSfarsit),
            sala: planificare.sali.denumire,
            eveniment: {
              denumire: planificare.evenimente.denumire,
              numarParticipanti: planificare.evenimente.numarParticipanti,
             // owner: planificare.evenimente.user.id
            }
          };
        });
      
        return result;
      }
    

      async updateTipEveniment( updateTipEveniment:UpdateTipEveniment)  {
        
        await this.tipEvenimentRepository.save( updateTipEveniment );
       
      }

      async deleteTipEveniment(prioritate:number)
      {
        await this.tipEvenimentRepository.delete({prioritate:prioritate});
      }

      async updateSali( updateSali:UpdateSali)  {
        
        await this.saliRepository.save( updateSali );
       
      }

      async deleteSali(tipsala:tipSala)
      {
        await this.saliRepository.delete({tipsala:tipsala});
      }

      async getNumarPrioritati() {
        
       return await this.tipEvenimentRepository.count();
       
        
        //return { numarPrioritati: numarPrioritati };
       
      }

     async getAllPrioritati(): Promise<{ id:number, denumire: string; prioritate: number }[]>{
      const prioritati = await this.tipEvenimentRepository.find({ select: ['id','denumire', 'prioritate'] });
      
      return prioritati.map(prioritati => ({
        id: prioritati.id,
        denumire: prioritati.denumire,
        prioritate: prioritati.prioritate,
        
      }));

     }

     async updateStareSali(id: number, isActive: boolean){
      const sala = await this.saliRepository.findOne({ where: { id: id } });
         if (!sala) {
            throw new NotFoundException(`Sala cu ID-ul ${id} nu a fost găsită.`);
          }
           sala.isActive = isActive;
        return await this.saliRepository.save(sala);
     }

}
