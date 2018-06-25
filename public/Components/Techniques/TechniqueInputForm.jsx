import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { addTechnique } from '../../graphql/mutations';

export default class TechniqueInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {}
    }
    this.ranks = [
      'NO_BELT',
      'WHITE',
      'ADV_WHITE',
      'YELLOW',
      'ADV_YELLOW',
      'ORANGE',
      'ADV_ORANGE',
      'GREEN',
      'ADV_GREEN',
      'BLUE',
      'ADV_BLUE',
      'PURPLE',
      'ADV_PURPLE',
      'BROWN',
      'ADV_BROWN',
      'BLACK'
    ]
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    const { target: { name, value }} = evt;

    Object.assign(this.state.payload, { [name]: value })
  }
  makeReadableOption(str) {
    return str.charAt(0) + str.slice(1).toLowerCase();
  }
  render() {
    // this is broken. the value for the items and selector needs to be fixed.
    const ranks = this.ranks.map((rank, index) => {
      let name = '';
      const re = /_/ig
      const adv = rank.match(re);

      if (adv) {
        name = rank.split('_').map((word, index) => {
          return this.makeReadableOption(word);
        }).join(' ');
      } else {
        name = this.makeReadableOption(rank);
      }

      return (
        <MenuItem key={`rank-${index}`} value={rank}>
          {name}
        </MenuItem>
      )
    })
    console.log(ranks, 'ranks')
    return (
      <Mutation mutation={addTechnique}>
        {(addTechnique, { data }) => (
          <div>
            <form onSubmit={evt => {
              evt.preventDefault();
              addTechnique({
                variables: this.state.payload
              })
              for (name in this.state.payload) {
                Object.assign(this.state.payload, {name: ''});
              }
            }}>
              <TextField type="text" onChange={this.handleChange} value={this.state.payload['name']} name="name" />
              <TextField type="text" onChange={this.handleChange} name="style" value={this.state.payload['style']} />
              <TextField type="text" onChange={this.handleChange} name="techniqueType" value={this.state.payload['techniqueType']} />
              <Select name="rank" id="rank" autoWidth={true} onChange={this.handleChange}>
                <MenuItem value=""></MenuItem>
                {ranks}
              </Select>
              <TextField multiline={true} name="description" id="description" cols="30" rows="10" value={this.state.payload['description']} onChange={this.handleChange} />
              <Button variant="contained" color="primary" type="submit">
                Add Technique
              </Button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}




// const TechniqueInputForm = () => {
//   <Mutation mutation={addTechnique}>
//     {(addTechnique, { data }) => (
//       <div>
//         <form onSubmit={evt => {
//           evt.preventDefault();
//           addTechnique({ variables: { } })
//         }}>
//           <button type="submit">Add Technique</button>
//         </form>
//       </div>
//     )}
//   </Mutation>
// }

// export default TechniqueInputForm;