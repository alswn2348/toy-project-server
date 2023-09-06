
import { IsString } from "class-validator";
import { IsNotEmptyString } from "src/decorators/is-npt-empty.decorator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'board'})
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmptyString(1, 20)
    @Column({ length: 20 })
    title: string;

    @IsString()
    @Column({default:""})
    description: string;

}