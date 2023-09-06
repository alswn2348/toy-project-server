import {  IsNotEmptyNumber, IsNotEmptyString } from 'src/decorators/is-npt-empty.decorator';
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Area1Entity } from './area_1.entity';
import { Area3Entity } from './area_3.entity';


@Entity({ name: 'area_2' })
export class Area2Entity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmptyString(1, 63)
    @Column({ length: 63 })
    name: string;

    //시군구 코드
    @IsNotEmptyNumber()
    @Column()
    code: number;

    @Column({ name: 'area1Id', nullable: true })
    area1Id: number;

    @ManyToOne(() => Area1Entity, (area1) => area1.area2List, {
        createForeignKeyConstraints: false,
        nullable: false,
    })
    @JoinColumn({ name: 'area1Id', referencedColumnName: 'id' })
    area1: Area1Entity;
    
    @OneToMany(() => Area3Entity, (area3) => area3.area2)
    area3List: Area3Entity[];
}