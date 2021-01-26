import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import http, { Server } from 'http';
import { isProduction } from '../utils/env';
import MusicFileDataSource from '../models/db/MusicFileDataSource';
import MusicFileSchema from '../models/db/MusicFileSchema';
import logger from '../utils/logger';
import schema from '../models/graphql/executableSchema';
import { streamingRoute } from './streaming';

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

      streamingRoute(app);

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
