import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Area2Entity } from './area_2.entity';
import { IsNotEmptyNumber, IsNotEmptyString } from 'src/decorators/is-npt-empty.decorator';


@Entity({ name: 'area_1' })
export class Area1Entity  {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmptyString(1, 63)
    @Column({ length: 63 })
    name: string;

    //시도 코드
    @IsNotEmptyNumber()
    @Column()
    code: number;

    @OneToMany(() => Area2Entity, (area2) => area2.area1)
    area2List: Area2Entity[];
}