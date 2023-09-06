import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    //dto에 정의되지 않은 속성 자동 제거
    whitelist:true,
    //정의된 유형 으로 자동 변환
    transform:true,
    transformOptions:{
      //문자열 암시적 변환
      enableImplicitConversion:true,
    }
  }))

  await app.listen(8000);
}
bootstrap();
