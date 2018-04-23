const {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
// const CombinationType = require('./combinationType');

const TechniqueType = new GraphQLObjectType({
  name: 'Technique',
  description: 'A single technique',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    style: { type: GraphQLString },
    techniqueType: { type: GraphQLString },
    description: { type: GraphQLString },
    rank: { type: GraphQLString },
    // combinations: { type: new GraphQLList(CombinationType) }
  })
});

module.exports = TechniqueType;