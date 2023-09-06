import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area1Entity } from 'src/resource/area/entities/area_1.entity';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area2Entity } from './entities/area_2.entity';
import { Area3Entity } from './entities/area_3.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Area1Entity, Area2Entity,Area3Entity]),],
    controllers: [AreaController],
    providers: [AreaService],
    exports:[AreaService],
})
export class AreaModule {}