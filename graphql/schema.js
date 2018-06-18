const mongoose = require('mongoose');
const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const Combination = require('../models/combination');
const CombinationType = require('./types/combinationType');

const Technique = require('../models/technique');
const TechniqueInputType = require('./types/techniqueInputType');
const TechniqueType = require('./types/techniqueType');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutations',
  fields: {
    addTechnique: {
      type: TechniqueType,
      description: 'Add a technique',
      args: {
        name: { type: GraphQLString },
        style: { type: GraphQLString },
        techniqueType: { type: GraphQLString },
        description: { type: GraphQLString },
        rank : { type: GraphQLString }
      },
      async resolve(_, args) {
        try {
          const newTechnique = new Technique(args);
          const technique = await newTechnique.save();
          return technique;
        } catch(err) {
          console.log(`addTechnique error -> ${err}`);
        }
      }
    },
    addCombination: {
      type: CombinationType,
      description: 'Create a combination',
      args: {
        name: { type: GraphQLString },
        techniques: { type: new GraphQLList(TechniqueInputType) }
      },
      async resolve(_, args) {
        try {
          // first - save a new combination to the db.
          // the technique id's will be passed in as references to find the Techniques.
          const newCombination = new Combination(args);
          const combination = await newCombination.save();

          // store the techniques array of id's as a variable
          const { techniques } = combination;

          // store the results of the Promises from finding the id's and populating.
          const results = await Promise.all(techniques.map(async technique => {
            return await Technique.findById(technique).populate('Technique');
          }));

          // return all the values in a single object.
          return {
            _id: combination._id,
            name: args.name,
            techniques: results,
          }
        } catch(err) {
          console.log(`addCombination error ${err}`);
        }
      }
    },
    updateTechnique: {
      type: TechniqueType,
      description: 'Change a technique',
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        style: { type: GraphQLString },
        techniqueType: { type: GraphQLString },
        description: { type: GraphQLString },
        rank: { type: GraphQLString }
      },
      async resolve(_, args) {
        try {
          const { _id } = args;
          const updatedTechnique = args;
          const update = await Technique.findByIdAndUpdate(_id, updatedTechnique);
          return update;
        } catch(err) {
          console.log(`updateTechnique error -> ${err}`);
        }
      }
    },
    deleteTechnique: {
      type: TechniqueType,
      description: 'Delete a technique',
      args: {
        _id: { type: GraphQLID }
      },
      async resolve(_, args) {
        try {
          const { _id } = args;
          const deletedTechnique = await Technique.findByIdAndRemove(_id);
          return deletedTechnique;
        } catch(err) {
          console.log(`deleteTechnique error -> ${err}`);
        }
      }
    },
    deleteCombination: {
      type: CombinationType,
      description: 'Delete a combination from the db',
      args: {
        _id: { type: GraphQLID },
      },
      async resolve(_, args) {
        try {
          const { _id } = args;
          const deletedCombination = await Combination.findByIdAndRemove(_id);
          return deletedCombination;
        } catch(err) {
          console.log(`deleteCombination error -> ${err}`);
        }
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: {
    combination: {
      type: CombinationType,
      description: 'A single combination',
      args: {
        _id: { type: GraphQLID }
      },
      async resolve(_, args) {
        try {
          const { _id } = args;
          const combination = await Combination.findById(_id);
          // store the techniques array of id's as a variable
          const { techniques } = combination;

          // store the results of the Promises from finding the id's and populating.
          const results = await Promise.all(techniques.map(async technique => {
            return await Technique.findById(technique).populate('Technique');
          }));

          return {
            _id: combination._id,
            name: combination.name,
            techniques: results,
          }
        } catch (err) {
          console.log(`combination error -> ${err}`);
        }
      }
    },
    allCombinations: {
      type: new GraphQLList(CombinationType),
      description: 'All combinations',
      async resolve() {
        try {
          const combinations = await Combination.find({});
          
          return await Promise.all(combinations.map(async combination => {
            const { techniques } = combination;

            const results = await Promise.all(techniques.map(async technique => {
              return await Technique.findById(technique).populate('Technique');
            }));

            return {
              _id: combination._id,
              name: combination.name,
              techniques: results
            }
          }));
        } catch (err) {
          console.log(`allCombinations error -> ${err}`);
        }
      }
    },
    technique: {
      type: TechniqueType,
      description: 'A single technique',
      args: {
        _id: { type: GraphQLID }
      },
      async resolve(_, args) {
        try {
          const { _id } = args;
          const technique = await Technique.findById(_id)
          return technique;
        } catch(err) {
          console.log(`Error -> ${err}`)
        }
      }
    },
    allTechniques: {
      type: new GraphQLList(TechniqueType),
      description: 'A list of all techniques',
      async resolve() {
        try {
          const techniques = await Technique.find({});
          return techniques;
        } catch (err) {
          console.log(`Error -> ${err}`)
        }
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation
});

module.exports = schema;