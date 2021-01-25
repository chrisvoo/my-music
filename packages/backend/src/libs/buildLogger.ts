// Same error levels used by NPM
import {
  createLogger, format, transports, Logger,
} from 'winston';
import { MongoDB, MongoDBConnectionOptions } from 'winston-mongodb';

export type LogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'

export type BootrapWinstonOptions = {
    mongoOptions: {
        db: string
        level?: LogLevel
        collection?: string
        options?: any // MongoClient's options
        expireAfterSeconds?: number
    }
    exitOnError?: boolean
}

/**
   * It creates a Logger instance
   * @param {object} options It contains all the options used to build the logger.
   * - `level (string)`: see `ERROR_LEVELS`, default "debug"
   * @returns {Logger}
   */
export default function buildLogger(options: BootrapWinstonOptions): Logger {
  const {
    combine,
    timestamp,
    json,
    colorize,
    prettyPrint,
    simple,
    errors,
  } = format;

  const { mongoOptions } = options;

  // see https://docs.mongodb.com/manual/reference/connection-string/
  if (!mongoOptions?.db) {
    throw new Error(
      "'mongoOptions' is missing or it's missing its property 'db' (Mongo's connection string)",
    );
  }

  const finalMongoOptions: MongoDBConnectionOptions = {
    db: mongoOptions.db,
    level: mongoOptions.level ?? 'debug',
    name: 'mongodb',
    collection: mongoOptions.collection ?? 'log',
    decolorize: true,
    tryReconnect: true,
    options: mongoOptions.options ?? {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  };

  if (Number.isInteger(mongoOptions.expireAfterSeconds)) {
    finalMongoOptions.expireAfterSeconds = mongoOptions.expireAfterSeconds;
  }

  return createLogger({
    level: finalMongoOptions.level,
    format: combine(
      // https://github.com/taylorhakes/fecha format
      timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
      prettyPrint({ depth: 5 }),
      json(),
      errors({ stack: true }),
    ),
    // https://github.com/winstonjs/winston#transports
    transports: [
      new transports.Console({
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        format: combine(colorize(), simple()),
      }),
      new MongoDB(finalMongoOptions),
    ],
    // https://github.com/winstonjs/winston#to-exit-or-not-to-exit
    exitOnError:
          typeof options.exitOnError === 'boolean'
            ? options.exitOnError
            : false,
  });
}
