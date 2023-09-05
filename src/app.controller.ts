import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
    ,private  readonly configService: ConfigService) {}

  @Get()
  getHello(){
    return {
      mode : `${this.configService.get('DB_HOST')} Mode`,
    };
  }
}
