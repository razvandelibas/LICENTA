import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.useGlobalPipes(new ValidationPipe({

    whitelist: true,

  }),
  );
 
  
  await app.listen(3000);
}
bootstrap();
