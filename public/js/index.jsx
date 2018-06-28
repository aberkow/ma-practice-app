// https://www.apollographql.com/docs/react/essentials/get-started.html
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Navigation from '../Components/Navigation/Navigation';
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
    const { target: { value } } = evt;
    this.setState({
      selectedTechnique: value
    })
    return this.state;
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
        <div>
          <h2>Working with Apollo</h2>
          <Navigation />
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/technique-select">Technique Select</Link></li>
              <li><Link to="/add-technique">Add Technique</Link></li>
            </ul>
          </div>

          <Route path="/technique-select" 
            render={() => <TechniqueSelect 
              value={this.state.selectedTechnique}
              onChange={this.selectTechnique} />}  />

          <Route path="/add-technique" component={TechniqueInputForm} />

        </div>
        </Router>
      </ApolloProvider>
    )
  }
}

render(<App />, document.getElementById('root'));




