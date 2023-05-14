import { IsInt, IsNumber } from "class-validator";
import { User } from "src/user/entitty/user.entity";

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sali } from "./sali.entity";



@Entity()
export class tipSala{

@PrimaryGeneratedColumn()
id: number;

@Column()
denumire:string;

@Column({  nullable: true })
descriere: string;

@OneToMany(()=>Sali, sala => sala.tipsala)
sali: Sali[];


}