import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: ' https://core-graphql.dev.waldo.photos/pizza'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            {
              pizzaSizes {
                maxToppings
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.pizzaSizes.map(({ maxToppings }) => (
              <div key={maxToppings}>
                <p>maxToppings: {maxToppings}</p>
              </div>
            ));
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
