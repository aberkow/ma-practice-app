import React from 'react';
import { Query } from 'react-apollo';
// import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { allTechniques } from '../../graphql/queries';
// import { Menu } from '@material-ui/core';

// const styles = theme => ({

// })

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
          <MenuItem key={`item-${index}`} value={item._id}>
            {item.name}
          </MenuItem>
        )
      });
      return (
        <Select name="techniques"
          autoWidth={true} 
          onChange={onChange}>
          <MenuItem value=""></MenuItem>
          {techniqueItems}
        </Select>
      )
    }}
  </Query>
);

export default TechniqueSelect;