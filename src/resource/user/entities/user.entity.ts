import { IsEmail } from 'class-validator';
import {  IsNotEmptyString } from 'src/decorators/is-npt-empty.decorator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity({ name: 'user' })
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmptyString(1, 63)
    @Column({ length: 63 })
    name: string;

  
    @IsEmail()
    @IsNotEmptyString(4, 63)
    @Column({ length: 63 })
    email: string;

   
    @IsNotEmptyString(1, 255)
    @Column({ length: 255 })
    password: string;
}