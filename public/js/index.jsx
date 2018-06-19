// https://www.apollographql.com/docs/react/essentials/get-started.html
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
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

const Test = () => (
  <Query query={gql`
    {
      allTechniques {
        name
        description
        rank
      }
    }
  `}
  >
    {({ loading, error, data}) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        console.log(error, 'query error');
        return <p>error</p>
      }
      const { allTechniques } = data;
      const techniqueItems = allTechniques.map((item, index) => {
        return (
          <li key={`item-${index}`}>
            {`${item.name}`}
          </li>
        )
      });
      return (
        <ul>
          {techniqueItems}
        </ul>
      )
    }}
  </Query>
);



const App = () => (
  <ApolloProvider client={client}>
    <h2>This is react!</h2>
    <Test />
  </ ApolloProvider>
);

render(<App />, document.getElementById('root'));