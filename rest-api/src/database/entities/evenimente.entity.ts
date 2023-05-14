import { IsInt, IsNumber } from "class-validator";
import { User } from "src/user/entitty/user.entity";

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Planificare } from "./planificare.entity";
import { Sali } from "./sali.entity";
import { tipEveniment } from "./tipEveniment.entity";



@Entity()
export class Evenimente{

@PrimaryGeneratedColumn()
id: number;

@Column()
denumire:string;

@Column()
dataInceput:string;


@Column()
dataSfarsit: string;

@Column()
numarParticipanti: number;

/*@Column({  nullable: true })
tipEvenimentId: number;*/

@ManyToOne(()=>tipEveniment, tipeveniment=>tipeveniment.evenimente)
tipeveniment: tipEveniment;


@ManyToOne(() => User, user => user.evenimente)
user: User;



@OneToMany(() => Planificare, (planificare) => planificare.evenimente)
planificare: Planificare[];

}