import React, { Component } from 'react';
// import { Mutation } from 'react-apollo';
// import { addTechnique } from '../../graphql/mutations';

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
      'PURPLE',
      'ADV_PURPLE',
      'BLACK'
    ]
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const { target: { name, value }} = evt;

    Object.assign(this.state.payload, { [name]: value })
  }
  handleSubmit(evt) {
    evt.preventDefault();
    console.log(this.state.payload, 'submission');
  }
  makeReadableOption(str) {
    return str.charAt(0) + str.slice(1).toLowerCase();
  }
  render() {
    const ranks = this.ranks.map((rank, index) => {
      let name = '';
      const re = /_/ig
      const adv = rank.match(re);

      if (adv) {
        name = rank.split('_').map((word, index) => {
          return this.makeReadableOption(word);
        }).join(' ');
      } else {
        return this.makeReadableOption(rank);
      }

      return <option key={`rank-${index}`} value={rank}>{name}</option>
      
    })
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.payload['input-name']} name="name" />
          <input type="text" onChange={this.handleChange} name="style" value={this.state.payload['input-style']} />
          <input type="text" onChange={this.handleChange} name="techniqueType" value={this.state.payload['input-techniqueType']} />
          <select name="ranks" id="ranks" onChange={this.handleChange}>
            <option value=""></option>
            {ranks}
          </select>
          <textarea name="description" id="description" cols="30" rows="10" value={this.state.payload['input-description']} onChange={this.handleChange} />
          <button type="submit">Add Technique</button>
        </form>
      </div>
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