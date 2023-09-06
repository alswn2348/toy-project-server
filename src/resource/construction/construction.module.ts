import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionEntity } from './entities/construction.entity';
import { ConstructionController } from './construction.controller';
import { ConstructionService } from './construction.service';
import { AreaModule } from '../area/area.module';

@Module({ 
    imports: [TypeOrmModule.forFeature([ConstructionEntity]),AreaModule],
    controllers:[ConstructionController],
    providers:[ConstructionService],
 })
export class ConstructionModule {}
