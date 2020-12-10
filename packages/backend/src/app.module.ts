import { Module } from '@nestjs/common';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { StreamingModule } from './modules/streaming/streaming.module';

/**
 * Global module
 */
@Module({
  imports: [MonitoringModule, StreamingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
