import { Module } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamingService } from './streaming.service';
import { MusicFileSchema } from '../../db/schemas/MusicFile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'files', schema: MusicFileSchema, collection: 'files' }]),
  ],
  controllers: [StreamingController],
  providers: [StreamingService],
})
export class StreamingModule {}
