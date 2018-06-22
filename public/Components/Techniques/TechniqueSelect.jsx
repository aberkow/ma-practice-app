import React from 'react';
import { Query } from 'react-apollo';
import { allTechniques } from '../../graphql/queries';

const TechniqueSelect = ({ onChange }) => (
  <Query query={allTechniques}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        console.log(error, 'query error');
        return <p>error</p>
      }
      const { allTechniques } = data;
      const techniqueItems = allTechniques.map((item, index) => {
        return (
          <option key={`item-${index}`} value={item._id}>
            {item.name}
          </option>
        )
      });
      return (
        <select name="techniques" onChange={onChange}>
          <option value=""></option>
          {techniqueItems}
        </select>
      )
    }}
  </Query>
);

export default TechniqueSelect;