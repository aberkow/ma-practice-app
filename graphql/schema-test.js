const mongoose = require('mongoose');
const {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const RootQuery = new GraphQLObjectType({

});

const Mutation = new GraphQLObjectType({

});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;