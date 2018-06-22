import gql from 'graphql-tag';

module.exports = {
  allTechniques: gql`
    {
      allTechniques {
        _id
        name
      }
    }
  `,
  techniqueDetails: gql`
    query technique($_id: ID!) {
      technique(_id: $_id) {
        description
      }
    }
  `
}