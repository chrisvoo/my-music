import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/allExceptions.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // middlewares and filters
  app.enableCors({ credentials: true, origin: configService.get<string>('FRONTEND_URL') });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(configService.get<number>('PORT'));
  console.log(`🎸 my-music is running on: ${await app.getUrl()}`);
}
bootstrap();
