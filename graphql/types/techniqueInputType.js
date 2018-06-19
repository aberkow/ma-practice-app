const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
// const CombinationType = require('./combinationType');

const TechniqueInputType = new GraphQLInputObjectType({
  name: 'TechniqueInput',
  description: 'A single technique to input',
  fields: () => ({
    _id: { type: GraphQLID },
    // name: { type: GraphQLString },
    // style: { type: GraphQLString },
    // techniqueType: { type: GraphQLString },
    // description: { type: GraphQLString },
    // rank: { type: GraphQLString },
    // combinations: { type: new GraphQLList(CombinationType) }
  })
});

module.exports = TechniqueInputType;