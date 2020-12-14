import { Module } from '@nestjs/common';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { StreamingModule } from './modules/streaming/streaming.module';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Global module
 */
@Module({
  imports: [
    MonitoringModule,
    StreamingModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
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
