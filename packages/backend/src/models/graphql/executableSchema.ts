import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { resolvers as scalarsResolvers, typeDefs as scalarsTypeDefs } from './scalars';
import { resolvers as mmresolvers, typeDefs as mmtypes } from './MyMusic';

const resolvers = [scalarsResolvers, mmresolvers];
const types = [scalarsTypeDefs, mmtypes];

export default makeExecutableSchema({
  typeDefs: mergeTypes(types),
  resolvers: mergeResolvers(resolvers),
});
