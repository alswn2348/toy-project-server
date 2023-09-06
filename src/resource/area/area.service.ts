import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area1Entity } from 'src/resource/area/entities/area_1.entity';
import { Between, ILike, Repository } from 'typeorm';
import { Area2Entity } from './entities/area_2.entity';
import { Area3Entity } from './entities/area_3.entity';

@Injectable()
export class AreaService {



    constructor(
        @InjectRepository(Area1Entity)
        private readonly area1Repo: Repository<Area1Entity>,
        @InjectRepository(Area2Entity)
        private readonly area2Repo: Repository<Area2Entity>,
        @InjectRepository(Area3Entity)
        private readonly area3Repo: Repository<Area3Entity>,
    ) { }

    async getA1All(): Promise<Area1Entity[]> {
        const result = await this.area1Repo.find();

        return result;
    }
    async getA2All(): Promise<Area2Entity[]> {
        const result = await this.area2Repo.find();
        return result;
    }
    async getA3All(): Promise<Area3Entity[]> {
        const result = await this.area3Repo.find();
        return result;
    }

    async getA2(a1: number): Promise<Area2Entity[]> {
        return await this.area2Repo.find({
            where: {
                area1Id: a1,
            },
        });
    }
    async getA3(a2: number): Promise<Area3Entity[]> {
        return await this.area3Repo.find({
            where: {
                area2Id: a2,
            },
        });
    }
    // area3 이름으로 검색
    async getA3Name(name: string): Promise<Area3Entity[]> {
        return await this.area3Repo.find({
            where: {
                name: ILike(`${name}%`),
            },
        });
    }
    async getA3ById(id: number): Promise<Area3Entity> {
        const found = await this.area3Repo.findOne({ where: { id: id, }, });

        if (!found) {
            throw new NotFoundException(`Can't find area3 with id ${id}`);
        }
        return found;
    }

    // area3 이름과 area2Id 업데이트
    async v1patchA3(id: number, name: string, area2Id: number) {
        await this.area3Repo.update({ id }, { name, area2Id });
    }
    // area3 이름과 area2Id 업데이트
    async v2patchA3(id: number, sigunguCd: string, bjdongCd: string, area2Id: number) {
        await this.area3Repo.update({ id }, { sigunguCd, bjdongCd, area2Id });
    }

    // area3 법정코드로 검색
    async getA3Code(bjdongCd,id):Promise<Area3Entity> {
        return await this.area3Repo.findOne({
            where: {
                bjdongCd : bjdongCd,
                area2Id : id
            },
        });
    }
}
