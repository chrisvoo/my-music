import { Express, Request, Response } from 'express';
import fs from 'fs';
import MusicFileSchema, { IMusicFile } from '../models/db/MusicFileSchema';

/**
 * The streaming route.
 * @param app The Express app
 */
export function streamingRoute(app: Express): void {
  app.get('/play/:trackId', async (request: Request, response: Response) => {
    const baseUrl = 'http://localhost'; // not important, URL requires an absolute URL
    const { searchParams } = new URL(request.url, baseUrl);

    let skip = 0;

    // useful if you want to start the streaming at a desired point
    if (searchParams.has('skip')) {
      const parsed = parseInt(searchParams.get('skip'), 10);
      if (!Number.isNaN(parsed)) {
        skip = parsed;
      }
    }

    if (!request.params.trackId) {
      response.status(400).json({
        error: true,
        description: 'Missing trackId parameter',
      });
      return;
    }

    const track: IMusicFile = await MusicFileSchema.findById(request.params.trackId).exec();
    if (!track) {
      response.status(400).json({
        error: true,
        description: 'Cannot find the requested track',
      });
      return;
    }

    let stats: fs.Stats;
    try {
      stats = await fs.promises.stat(track.filename);
    } catch (e) {
      // let's also get rid of the file's reference in the database
      await MusicFileSchema.deleteOne({ filename: track.filename });
      response.status(400).json({
        error: true,
        description: `${track.filename} is missing from the file system`,
      });
    }

    const startByte = skip;
    const contentLength = stats.size;

    if (request.headers.range) {
      const { range } = request.headers;
      const [partialstart, partialend] = range.replace(/bytes=/, '').split('-');
      const start = parseInt(partialstart, 10);
      const end = partialend ? parseInt(partialend, 10) : contentLength - 1;
      const chunksize = (end - start) + 1;

      const readStream = fs.createReadStream(track.filename, { start, end });
      response.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${contentLength}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mpeg',
      });
      readStream.pipe(response);
    } else {
      response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stats.size - startByte,
      });

      fs.createReadStream(track.filename, { start: startByte }).pipe(response);
    }
  });
}
