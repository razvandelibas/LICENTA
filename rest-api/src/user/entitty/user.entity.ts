import { IsInt, IsNumber } from "class-validator";
import { Evenimente } from "src/database/entities/evenimente.entity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User{

@PrimaryGeneratedColumn()
id: number;

@Column()
name:string;

@Column({unique:true})
email:string;


@Column()
password: string;

@Column({ default: 'BasicUser' })
role: string;

@Column({  nullable: true })
authConfirmToken: string;

@OneToMany(()=>Evenimente, eveniment => eveniment.user)
evenimente: Evenimente[];

}