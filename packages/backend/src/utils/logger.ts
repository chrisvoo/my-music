import buildLogger from '../libs/buildLogger';

export default buildLogger({
  mongoOptions: {
    db: process.env.MONGO_URI,
  },
});
