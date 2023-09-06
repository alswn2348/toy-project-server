import { Controller, Get, Logger, Param, ParseIntPipe } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { AreaService } from '../area/area.service';

@Controller('construction')
export class ConstructionController {

    constructor(private readonly constructionService: ConstructionService,
        private readonly areaService: AreaService) { }


    @Get('/:id')
    async getConstructionById(@Param('id', ParseIntPipe) id: number) {
        const construction = await this.constructionService.getConstructionCode(id);
        return construction;
    }

    @Get('/api/:id')
    async getConstructionByIdUseApi(@Param('id', ParseIntPipe) id: number) {
        const area3 = await this.areaService.getA3ById(id);
        const constructionData = await this.constructionService.getOpenConstructionCode(area3.sigunguCd, area3.bjdongCd);

        //공백만 있는 문자열
        const regex = /^\s*$/;
        Logger.log(constructionData)
        const result = await Promise.all(constructionData.flat().map(async (construction) => {
            const { bldNm, archPmsDay, mainPurpsCd, mainPurpsCdNm, archGbCdNm } = construction || {};
            if (!regex.test(bldNm)) {
                const constructionEntity = {
                    archPmsDay: archPmsDay && !regex.test(archPmsDay) ? archPmsDay : null,
                    bldNm: bldNm.toString(),
                    mainPurpsCd: mainPurpsCd && !regex.test(mainPurpsCd)? mainPurpsCd.toString() : null,
                    mainPurpsCdNm: mainPurpsCdNm && !regex.test(mainPurpsCdNm)? mainPurpsCdNm.toString() : null,
                    id: id,
                    archGbCdNm: archGbCdNm && !regex.test(archGbCdNm)? archGbCdNm.toString() : null,
                }
                return constructionEntity
            }
        }),
        );
        return result.filter((item) => item != null);
    }


}
