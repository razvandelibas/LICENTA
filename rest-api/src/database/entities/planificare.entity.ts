import { IsInt, IsNumber } from "class-validator";
import { User } from "src/user/entitty/user.entity";

import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evenimente } from "./evenimente.entity";
import { PlanificareOrara } from "./planificareOrara.entity";
import { Sali } from "./sali.entity";



@Entity()
export class Planificare{

@PrimaryGeneratedColumn()
id: number;

@Column()
dataInceput:string;

@Column()
dataSfarsit:string;

@ManyToOne(() => Evenimente, (evenimente) => evenimente.planificare, { onDelete: 'CASCADE' })
evenimente: Evenimente;

@ManyToOne(() => Sali, (sali) => sali.planificare, { onDelete: 'CASCADE' })
sali: Sali;

@OneToMany(()=>PlanificareOrara, planificareOrara => planificareOrara.planificare)
planificareOrara: PlanificareOrara[];

}