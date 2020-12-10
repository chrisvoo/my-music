import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs';
import { StreamingService } from './streaming.service';

@Controller('play')
export class StreamingController {
  constructor(private readonly service: StreamingService) {}

  /**
   * Streams a musical file, with the option to skip the first X bytes.
   *
   * @param {string} id The track's ID
   * @param {Request} request Express request
   * @param {Response} response Express response
   */
  @Get('track/:id')
  playTrack(
    @Param('id') id: string,
    @Query('skip', new DefaultValuePipe(-1), ParseIntPipe) skip: number,
    @Res() response: Response,
  ) {
    const filePath = '';
    const stat = fs.statSync(filePath);
    const startByte = skip !== -1 ? skip : 0;

    response.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size - startByte,
    });

    fs.createReadStream(filePath, { start: startByte }).pipe(response);
  }
}
