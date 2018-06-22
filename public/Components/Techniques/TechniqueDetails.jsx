import React from 'react';
import { Query } from 'react-apollo';
import { techniqueDetails } from '../../graphql/queries';

/**
 * 
 * @param {_id} string - the db id. arrives from the state of the App.
 */
const TechniqueDetails = ({ _id }) => (
  <Query query={techniqueDetails} variables={{ _id }}>
    {({ loading, err, data }) => {
      if (loading) return <p>Loading details...</p>
      if (err) {
        console.log(`details error -> ${err}`)
      }
      const { technique: { description } } = data;
      return (
        <p>{description}</p>
      )
    }}
  </Query>
)

export default TechniqueDetails;