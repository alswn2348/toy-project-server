import { Injectable, Logger } from '@nestjs/common';
import { ConstructionEntity } from './entities/construction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class ConstructionService {

    constructor(
        @InjectRepository(ConstructionEntity)
        private readonly constructionRepo: Repository<ConstructionEntity>,
    ) { }

    async getOpenConstructionCode(sigunguCd, bjdongCd) {
        try {
            const res = await axios.get('https://apis.data.go.kr/1613000/ArchPmsService_v2/getApBasisOulnInfo', {
                params: {
                    serviceKey: process.env.API_KEY,
                    sigunguCd: sigunguCd,
                    bjdongCd: bjdongCd,
                    platGbCd: 0,
                    pageNo: 1,
                    numOfRows: 30000,
                },
            });
            return res.data.response?.body?.items.item;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Logger.error(error.response?.data.message)
            }
        }


    }

    async postConstruction(ConstructionEntity) {
        return await this.constructionRepo.save(ConstructionEntity);
    }

    async getConstructionCode(a3Id: number): Promise<ConstructionEntity[]> {
        return await this.constructionRepo.find({
            where: {
                area3Id: a3Id,
            },
        });
    }
}
