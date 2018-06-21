// https://www.apollographql.com/docs/react/essentials/get-started.html
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { render } from 'react-dom';

const client = new ApolloClient();

// this is a different way of making the query.
// the only thing that needs to get passed to ApolloProvider is the instance and then a Query component
// client.query({
//   query: gql`
//     {
//       allTechniques {
//         _id
//         name
//         style
//         techniqueType
//         description
//         rank
//       }
//     }
//   `
// }).then(result => console.log(result.data, 'client query result'));

const allTechniqueNames = gql`
  {
    allTechniques {
      _id
      name
    }
  }
`;

const techniqueDetails = gql`
  query technique($_id: ID!) {
    technique(_id: $_id) {
      description
    }
  }
`

class TechniqueNames extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Query query={allTechniqueNames}
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
              <option key={`item-${index}`} value={`${item._id}`}>
                {`${item.name}`}
              </option>
            )
          });
          return (
            <select value={this.props.value} onChange={(evt) => this.props.onChange(evt)}>
              {techniqueItems}
            </select>
          )
        }}
      </Query>
    )
  }
}


const TechniqueDetails = ({ _id }) => (
  <Query query={techniqueDetails} variables={{ _id }}>
    {({ loading, err, data }) => {
      if (loading) return <p>Loading details...</p>
      if (err) {
        console.log(`details error -> ${err}`)
      }
      const { technique: { description }} = data;
      return (
        <p>{description}</p>
      )
    }}
  </Query>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTechnique: null
    }
    this.selectTechnique = this.selectTechnique.bind(this);
  }
  selectTechnique(evt) {
    const { target } = evt;
    this.setState({
      selectedTechnique: target.value
    })
    return this.state;
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>Working with Apollo</h2>
          <TechniqueNames value={this.state.selectedTechnique} onChange={this.selectTechnique} />
          {
            this.state.selectedTechnique && <TechniqueDetails _id={this.state.selectedTechnique} />
          }
        </div>
      </ApolloProvider>
    )
  }
}

render(<App />, document.getElementById('root'));




// const TechniqueNames = ({ something }) => (
//   <Query query={allTechniqueNames}
//   >
//     {({ loading, error, data}) => {
//       if (loading) return <p>Loading...</p>
//       if (error) {
//         console.log(error, 'query error');
//         return <p>error</p>
//       }
//       const { allTechniques } = data;
//       const techniqueItems = allTechniques.map((item, index) => {
//         return (
//           <option key={`item-${index}`} value={`${item.name}`}>
//             {`${item.name}`}
//           </option>
//         )
//       });
//       return (
//         <select onChange={something}>
//           {techniqueItems}
//         </select>
//       )
//     }}
//   </Query>
// );