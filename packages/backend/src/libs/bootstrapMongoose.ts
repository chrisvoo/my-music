import mongoose from 'mongoose';
import { ConnectionString } from 'connection-string';
import logger from '../utils/logger';

/**
 * Initialize mongoose connecting to MongoDB and setting the global properties
 * @returns {Promise<Number>} the ready state
 */
export default function bootstrapMongoose(): Promise<number> {
  return new Promise((resolve, reject) => {
    const cs = new ConnectionString(process.env.MONGO_URI, {
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASS,
    });

    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true' || false);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(cs.toString(), (err) => {
      if (err) {
        reject(err);
        return;
      }

      logger.info(
        `Connected to ${process.env.MONGO_URI}. readyState: ${mongoose.connection.readyState}`,
      );
      resolve(mongoose.connection.readyState);
    });
  });
}

export {
  mongoose,
};
