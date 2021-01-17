import { Module } from '@nestjs/common';
import Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { StreamingModule } from './modules/streaming/streaming.module';
import { ApiModule } from './modules/api/api.module';

/**
 * Global module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      //  you do not need to import this in other modules once it's been loaded here
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().default(3001),
      }),
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
    ApiModule,
    MonitoringModule,
    StreamingModule,
    MongooseModule.forRoot('mongodb://localhost/my-music', {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
