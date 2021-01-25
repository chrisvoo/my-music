import Joi from 'joi';

/**
 * Tells if NODE_ENV is set to "production".
 * @returns {boolean}
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Tells if NODE_ENV is set to "development".
 * @returns {boolean}
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Validates the environment variables specified in the env file.
 */
export const envSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  MONGODB_USER: Joi.string().allow(''),
  MONGODB_PASS: Joi.string().allow(''),
  MONGOOSE_DEBUG: Joi.boolean().default(false),
  MONGO_URI: Joi.string().uri({
    scheme: [
      'mongodb',
      'mongodb+srv',
    ],
  }).required(),
  PORT: Joi.number().min(1025).max(65535).required(),
}).required(); // otherwise even undefined validates fine.
