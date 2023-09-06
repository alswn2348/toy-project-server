import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resource/user/user.module';
import { BoardModule } from './resource/board/board.module';
import { AreaModule } from './resource/area/area.module';
import { ConstructionService } from './resource/construction/construction.service';
import { ConstructionController } from './resource/construction/construction.controller';
import { ConstructionModule } from './resource/construction/construction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeormConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeormConfig
    }),
    ScheduleModule.forRoot(),  // 스케줄 모듈 추가
    UserModule,
    BoardModule,
    AreaModule,
    ConstructionModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
