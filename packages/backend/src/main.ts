import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';

config();

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/allExceptions.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // middlewares and filters
  app.enableCors({ credentials: true, origin: process.env.FRONTEND_URL });
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(3001);
}
bootstrap();
