const {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const TechniqueType = require('./techniqueType');

const CombinationType = new GraphQLObjectType({
  name: 'Combination',
  description: 'A group of techniques to create a combination',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    techniques: { type: new GraphQLList(TechniqueType) }
  })
})

module.exports = CombinationType;