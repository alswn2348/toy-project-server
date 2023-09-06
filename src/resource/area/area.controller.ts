import { Controller, Get, Patch, Query } from '@nestjs/common';
import { AreaService } from './area.service';
import { Area2Entity } from './entities/area_2.entity';
import { Area3Entity } from './entities/area_3.entity';
import { Area1Entity } from './entities/area_1.entity';

@Controller('area')
export class AreaController {
    constructor(private areaService: AreaService) { }

    @Get('a1')
    async getA1All(): Promise<Area1Entity[]> {
        return await this.areaService.getA1All();
    }

    @Get('a2')
    async getA2(@Query('a1') a1: number): Promise<Area2Entity[]> {
        return await this.areaService.getA2(a1);
    }


    @Get('a3')
    async getA3(@Query('a2') a2: number): Promise<Area3Entity[]> {
        return await this.areaService.getA3(a2);
    }
    async v1patchA3(): Promise<String> {
        const areaA1 = await this.areaService.getA1All();

        // area1, area2의 name 결합
        const mergeName = await Promise.all(
            areaA1.map(async (area1) => {
                const { id: area1Id } = area1;

                const areaA2 = await this.areaService.getA2(area1Id);
                const result = areaA2.map((area2) => {
                    return {
                        name: area1.name + ' ' + area2.name,
                        area2Id: area2.id,
                    };
                });

                return result;
            }),
        );

        // 결합된 name으로 area3 name 편집
        const areaA3 = await Promise.all(
            mergeName.flat().map(async (item) => {
                const { name, area2Id } = item;

                const areaA3All = await this.areaService.getA3Name(name);

                return areaA3All.map((area3) => {
                    const editName = area3.name.split(name)[1].trim();
                    return {
                        id: area3.id,
                        name: editName,
                        area2Id,
                    };
                });
            }),
        );

        // 편집된 정보를 업데이트
        await Promise.all(
            areaA3.flat().map(async (area3) => {
                const { id, name, area2Id } = area3;
                await this.areaService.v1patchA3(id, name, area2Id);
            }),
        );

        return '수정 완료';
    }
    @Patch('v2/a3')
    async v2patchA3() : Promise<String> {
        const areaA1 = await this.areaService.getA1All();


        const mergeCode = await Promise.all(
            areaA1.map(async (area1) => {
                //구조분해
                const { id: area1Id } = area1;

                const areaA2 = await this.areaService.getA2(area1Id);
                const result = areaA2.map((area2) => {
                    return {
                        sigunguCd: area2.code,
                        area2Id: area2.id,
                    };
                });

                return result;
            }),
        );

        // 결합된 name으로 area3 name 편집
        const areaA3 = await Promise.all(
            mergeCode.flat().map(async (item) => {
                const { sigunguCd, area2Id } = item;

                const areaA3All = await this.areaService.getA3(area2Id);

                return areaA3All.map((area3) => {

                    return {
                        id: area3.id,
                        sigunguCd: sigunguCd,
                        bjdongCd: area3.bjdongCd.substring(5),
                        area2Id,
                    };
                });
            }),
        );

        // 편집된 정보를 업데이트
        await Promise.all(
            areaA3.flat().map(async (area3) => {
                const { id, sigunguCd, bjdongCd, area2Id } = area3;
                var sigunguCdStr = sigunguCd as unknown as string
                var bjdongCdStr = bjdongCd as unknown as string
                await this.areaService.v2patchA3(id, sigunguCdStr, bjdongCdStr, area2Id);
            }),
        );

        return '수정 완료';
    }
}