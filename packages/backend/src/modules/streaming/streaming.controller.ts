import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
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
  async playTrack(
    @Param('id') id: string,
    @Query('skip', new DefaultValuePipe(-1), ParseIntPipe) skip: number,
    @Res() response: Response,
  ) {
    const musicFile = await this.service.getTrack(id);

    if (!musicFile) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        error: true,
        message: `Cannot find any file with ID ${id} in the database`,
      });
      return;
    }

    let stat;

    try {
      stat = await fs.promises.stat(musicFile.filename);
    } catch (e) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        error: true,
        message: `Cannot find any file named ${musicFile.filename} in the file system`,
      });
      console.error(e.message);
      return;
    }

    const startByte = skip !== -1 ? skip : 0;

    response.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size - startByte,
    });

    fs.createReadStream(musicFile.filename, { start: startByte }).pipe(
      response,
    );
  }
}
