// src/entities/apart.entity.ts
import { Area3Entity } from 'src/resource/area/entities/area_3.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'construction' })
export class ConstructionEntity{

    @PrimaryGeneratedColumn()
    id: number;

    //건축 허가일
    @Column({ nullable: true })
    archPmsDay : String;

    //건물명
    @Column({ nullable: true })
    bldNm : string;

    //용도 코드
    @Column({ nullable: true })
    mainPurpsCd : string;

    //용도 코드명
    @Column({ nullable: true })
    mainPurpsCdNm : string;

    //건축구분 코드명
    @Column({ nullable: true })
    archGbCdNm: string;

    @Column({ name: 'area3Id', nullable: true })
    area3Id: number;

    @ManyToOne(() => Area3Entity, (area3) => area3.constructionList, {
        createForeignKeyConstraints: false,
        nullable: false,
    })
    @JoinColumn({ name: 'area3Id', referencedColumnName: 'id' })
    area3: Area3Entity;
}