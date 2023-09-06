import {  IsNotEmptyNumber, IsNotEmptyString } from 'src/decorators/is-npt-empty.decorator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Area2Entity } from './area_2.entity';
import { ConstructionEntity } from 'src/resource/construction/entities/construction.entity';


@Entity({ name: 'area_3' })
export class Area3Entity {
    @PrimaryGeneratedColumn()
    id: number;
   
    @IsNotEmptyString(1, 63)
    @Column({ length: 63 })
    name: string;

    //시군구 코드
    @IsNotEmptyNumber()
    @Column({  nullable: true })
    sigunguCd: string;

    //법정동 코드
    @IsNotEmptyNumber()
    @Column({  nullable: true })
    bjdongCd: string;

    @Column({ name: 'area2Id', nullable: true })
    area2Id: number;

    @ManyToOne(() => Area2Entity, (area2) => area2.area3List, {
        createForeignKeyConstraints: false,
        nullable: false,
    })
    @JoinColumn({ name: 'area2Id', referencedColumnName: 'id' })
    area2: Area2Entity;
    
    @OneToMany(()=> ConstructionEntity,(construction)=>construction.area3)
    constructionList: ConstructionEntity[];
}