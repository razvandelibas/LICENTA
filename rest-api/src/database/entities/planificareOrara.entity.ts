import { IsInt, IsNumber } from "class-validator";
import { User } from "src/user/entitty/user.entity";

import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evenimente } from "./evenimente.entity";
import { Planificare } from "./planificare.entity";
import { tipSala } from "./tipSala.entity";



@Entity()
export class PlanificareOrara{

@PrimaryGeneratedColumn()
id: number;

@Column()
data:string;

@Column()
oraInceput:number;

@Column()
oraSfarsit:number;

@Column({  nullable: true })
denumire: string;

@ManyToOne(() => Planificare, planificare => planificare.planificareOrara)
planificare: Planificare;

}