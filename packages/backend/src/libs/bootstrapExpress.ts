import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import http, { Server } from 'http';
import fs from 'fs';
import { isProduction } from '../utils/env';
import MusicFileDataSource from '../models/db/MusicFileDataSource';
import MusicFileSchema, { IMusicFile } from '../models/db/MusicFileSchema';
import logger from '../utils/logger';
import schema from '../models/graphql/executableSchema';

export type ExpressApp = {
  app: Express
  server: Server
}

/**
 * It creates the Express app
 * @returns {Promise<ExpressApp>}
 */
export default function bootstrapExpress(): Promise<ExpressApp> {
  return new Promise((resolve, reject) => {
    try {
      const app = express();
      app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
      app.use(express.json());
      app.disable('x-powered-by');

      app.get('/play/:trackId', async (request, response) => {
        const { searchParams } = new URL(request.url);

        let skip = 0;

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

        response.writeHead(200, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': stats.size - startByte,
        });

        fs.createReadStream(track.filename, { start: startByte }).pipe(response);
      });

      const httpServer = http.createServer(app);

      const server = new ApolloServer({
        debug: !isProduction(),
        introspection: !isProduction(),
        stopOnTerminationSignals: true,
        schema,
        dataSources: () => ({
          files: new MusicFileDataSource(MusicFileSchema),
        }),
        playground: { version: '1.7.25' },
      });

      server.applyMiddleware({ app });
      httpServer.listen({ port: process.env.PORT }, () => {
        logger.info(`🎸 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
        resolve({ app, server: httpServer });
      });
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
}
