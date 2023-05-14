import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entitty/user.entity';
import { UserModule } from 'src/user/user.module';
import { DatabaseService } from './database.service';
import { Evenimente } from './entities/evenimente.entity';
import { Planificare } from './entities/planificare.entity';
import { PlanificareOrara } from './entities/planificareOrara.entity';
import { Sali } from './entities/sali.entity';
import { tipSala } from './entities/tipSala.entity';
import { DatabaseController } from './database.controller';
import { tipEveniment } from './entities/tipEveniment.entity';

@Module({
  imports:[UserModule,TypeOrmModule.forFeature([User,Evenimente,Sali,tipSala,Planificare, PlanificareOrara,tipEveniment]),],
  providers: [DatabaseService],
  controllers: [DatabaseController],
  exports:[DatabaseService]
})
export class DatabaseModule {}
