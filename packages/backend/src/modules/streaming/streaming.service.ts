import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  playTrack(id: string) {
    return {
      song: 'hey',
      id,
    };
  }
}
