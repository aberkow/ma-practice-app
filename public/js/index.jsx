// https://www.apollographql.com/docs/react/essentials/get-started.html
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import React, { Component } from 'react';
import { render } from 'react-dom';

import TechniqueDetails from '../Components/Techniques/TechniqueDetails';
import TechniqueSelect from '../Components/Techniques/TechniqueSelect';
import TechniqueInputForm from '../Components/Techniques/TechniqueInputForm';

const client = new ApolloClient();

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
          <TechniqueSelect value={this.state.selectedTechnique} onChange={this.selectTechnique} />
          {
            this.state.selectedTechnique && <TechniqueDetails _id={this.state.selectedTechnique} />
          }
          <TechniqueInputForm />
        </div>
      </ApolloProvider>
    )
  }
}

render(<App />, document.getElementById('root'));




