/* eslint-disable import/first */
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import checkvar from 'checkvar';
import { envSchema } from './utils/env';

const myEnv = dotenv.config();
const result = dotenvExpand(myEnv);
const { error } = envSchema.validate(result.parsed);

import logger from './utils/logger';
import bootstrapExpress from './libs/bootstrapExpress';
import bootstrapMongoose, { mongoose } from './libs/bootstrapMongoose';

if (checkvar(error)) {
  logger.error(error);
  process.exit(1);
}

/* In the child the process object will have a send() method, and process will
 * emit objects each time it receives a message on its channel. */
process.send = process.send || function dummy(message: any): boolean { return true; };

Promise.all([
  bootstrapMongoose(),
  bootstrapExpress(),
])
  .then((bootResponses) => {
    process.send('ready');

    process.on('SIGINT', () => {
      logger.info('Shutting down MyMusic...');
      bootResponses[1].server.close((err) => {
        if (err) {
          logger.error('Error during express shutdown', {
            metadata: {
              message: err.name,
            },
          });
        }
        mongoose.connection.close();
      });
    });
  })
  .catch((e) => logger.error(e));
