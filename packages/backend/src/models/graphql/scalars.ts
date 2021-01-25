import { DateTime, GraphQLJSON } from './commonTypes';

export const typeDefs = `
    scalar DateTime
    scalar JSON
`;

export const resolvers = {
  DateTime,
  JSON: GraphQLJSON,
};
