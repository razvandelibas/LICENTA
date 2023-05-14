import { IsInt, IsNumber } from "class-validator";
import { User } from "src/user/entitty/user.entity";

import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evenimente } from "./evenimente.entity";
import { Planificare } from "./planificare.entity";
import { tipSala } from "./tipSala.entity";



@Entity()
export class Sali{

@PrimaryGeneratedColumn()
id: number;

@Column()
denumire:string;

@Column()
capacitate:number;

@Column()
isActive:boolean;


@ManyToOne(() => tipSala, tipsala => tipsala.sali)
tipsala: tipSala;


@OneToMany(() => Planificare, (planificare) => planificare.sali)
  planificare: Planificare[];

}

