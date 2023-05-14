import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evenimente } from "./evenimente.entity";

@Entity()
export class tipEveniment{

@PrimaryGeneratedColumn()
id: number;

@Column({  nullable: true })
denumire:string;

@Column({  nullable: true })
prioritate:number;

@OneToMany(()=>Evenimente, eveniment => eveniment.tipeveniment)
evenimente: Evenimente[];

}