import gql from 'graphql-tag';

module.exports = {
  addTechnique: gql(`
    mutation addTechnique(
      $name: String,
      $style: String,
      $techniqueType: String,
      $description: String,
      rank: String
    ) {
      addTechnique(
        name: $name,
        style: $style,
        techniqueType: $techniqueType,
        description: $description,
        rank: $rank
      ) {
        name,
        style,
        techniqueType,
        description,
        rank
      }
    }
  `)
}

