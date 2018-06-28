import React from 'react';
import { Query } from 'react-apollo';
// import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { allTechniques } from '../../graphql/queries';
import TechniqueDetails from './TechniqueDetails';
// import { Menu } from '@material-ui/core';

const TechniqueSelect = ({ value, onChange }) => (
  <Query query={allTechniques}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        console.log(error, 'query error');
        return <p>error</p>
      }
      const { allTechniques } = data;
      const sorted = allTechniques.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        } else {
          return 1;
        }
      });
      const techniqueItems = sorted.map((item, index) => {
        return (
          <MenuItem key={`item-${index}`} value={item._id}>
            {item.name}
          </MenuItem>
        )
      });
      return (
        <div>
          <Select name="techniques"
            autoWidth={true} 
            onChange={onChange}
            value={value}>
            <MenuItem value=""></MenuItem>
            {techniqueItems}
          </Select>
          {/* 
            conditional loading of the technique details
          */}
          { value && <TechniqueDetails _id={value} /> }
        </div>
      )
    }}
  </Query>
);

export default TechniqueSelect;